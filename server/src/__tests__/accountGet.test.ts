import db from '../db/mongoose';
import app from '../app';
import server from '../index';
import * as supertest from 'supertest';
import { Account } from '../models/account';

const api = supertest(app)
let user: any;

jest.setTimeout(30000);

const account = {
    username: "Prueba",
    accountName: "prueba",
    email: "prueba@gmail.com",
    password: "prueba1prueba"
}

beforeAll(async () => {
    await Account.deleteMany({});
    await api
        .post('/signup')
        .send(account)
        .expect(201)
    user = await api
        .post('/login')
        .send({
            accountName: "prueba",
            password: "prueba1prueba"
        })
        .expect(201)
})

afterAll(async () => {
    db.close();
    server.close();
});


describe('get /- Get an existing account', () => {
    test('getting the account created', async () => {
        const token = "Bearer " + user.body.accessToken;
        await api
            .get("/account")
            .set("authorization", token)
            .query({ accountName: "prueba" }).
            expect(response => {
                expect(response.status).toBe(200);
                expect(response.body.username).toBe(account.username);
                expect(response.body.email).toBe(account.email);
                expect(response.body.description).toBe("");
                expect(response.body.profilePicture).toBe("");
                expect(response.body.posts).toStrictEqual([]);
                expect(response.body.likedPosts).toStrictEqual([]);
            })
    });
});
