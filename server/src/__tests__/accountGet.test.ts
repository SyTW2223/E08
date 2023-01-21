import db from '../db/mongoose';
import app from '../app';
import server from '../index';
import * as supertest from 'supertest';
import { Account } from '../models/account';

const api = supertest(app)

jest.setTimeout(100000000);

let user: any;


const account3 = {
    username: "Prueba3",
    accountName: "prueba3",
    email: "prueba3@gmail.com",
    password: "prueba3prueba"
}

beforeAll(async () => {
    await Account.deleteMany({});
    await api
        .post('/signup')
        .send(account3)
        .expect(201)
    user = await api
        .post('/login')
        .send({
            accountName: "prueba3",
            password: "prueba3prueba"
        })
        .expect(201)
})

afterAll(async () => {
    await Account.deleteMany({});
    db.close();
    server.close();
});


describe('get /- Get an existing account', () => {
    test('getting the account created', async () => {
        const token = "Bearer " + user.body.accessToken;
        await api
            .get("/account")
            .set("authorization", token)
            .query({ accountName: "prueba3" }).
            expect(response => {
                expect(response.status).toBe(200);
                expect(response.body.username).toBe(account3.username);
                expect(response.body.email).toBe(account3.email);
                expect(response.body.description).toBe("");
                expect(response.body.profilePicture).toBe("");
                expect(response.body.posts).toStrictEqual([]);
                expect(response.body.likedPosts).toStrictEqual([]);
            })
    });
});
