import db from '../db/mongoose';
import app from '../app';
import server from '../index';
import * as supertest from 'supertest';
import { Account } from '../models/account';


const api = supertest(app)

jest.setTimeout(100000000)

let user: any;
let user2: any;


const account = {
    username: "Prueba",
    accountName: "prueba",
    email: "prueba@gmail.com",
    password: "prueba1prueba"
}

const account2 = {
    username: "Prueba2",
    accountName: "prueba2",
    email: "prueba2@gmail.com",
    password: "prueba2prueba"
}

beforeAll(async () => {
    await Account.deleteMany({});
    await api
        .post('/signup')
        .send(account)
        .expect(201)
    await api
        .post('/signup')
        .send(account2)
        .expect(201)
    user = await api
        .post('/login')
        .send({
            accountName: "prueba",
            password: "prueba1prueba"
        })
        .expect(201);
    user2 = await api
        .post('/login')
        .send({
            accountName: "prueba2",
            password: "prueba2prueba"
        })
        .expect(201);
})

afterAll(async () => {
    await Account.deleteMany({});
    db.close();
    server.close();
});


describe('Delete /- Delete an existing account', () => {
    test('It must require an account name', async () => {
        const token = "Bearer " + user.body.accessToken;
        await api
            .delete("/account")
            .set("authorization", token)
            .expect(response => {
                expect(response.status).toBe(404);
                expect(response.text).toBe(
                    "An account name needs to be provided"
                );
            });
    });
    test('It must require a valid token', async () => {
        await api
            .delete("/account")
            .set("authorization", "rhbbjewbfjeqbhfqwhdjksddcjdcbjadbcjhas")
            .expect(response => {
                expect(response.status).toBe(401);
                expect(response.text).toBe(
                    "Please authenticate"
                );
            });
    });
    test('It must require a valid account name', async () => {
        const token = "Bearer " + user.body.accessToken;
        await api
            .delete("/account")
            .set("authorization", token)
            .query({ accountName: "prueba1" })
            .expect(response => {
                expect(response.status).toBe(404);
                expect(response.text).toBe(
                    "Account not found"
                );
            });
    });
    test('deleting the account created', async () => {
        const token = "Bearer " + user.body.accessToken;
        await api
            .delete("/account")
            .set("authorization", token).query({ accountName: "prueba" }).
            expect(200)
    })
})

describe('Delete by id /- Delete an existing account', () => {
    test('It must require a valid token', async () => {
        await api
            .delete(`/account/${user2.body.id}`)
            .set("authorization", "rhbbjewbfjeqbhfqwhdjksddcjdcbjadbcjhas")
            .expect(response => {
                expect(response.status).toBe(401);
                expect(response.text).toBe(
                    "Please authenticate"
                );
            });
    });
    test('deleting the account created', async () => {
        const token = "Bearer " + user2.body.accessToken;
        await api
            .delete(`/account/${user2.body.id}`)
            .set("authorization", token)
            .expect(response => {
                expect(response.status).toBe(200);
                expect(response.text).not.toBeNull();
            });
    });

});