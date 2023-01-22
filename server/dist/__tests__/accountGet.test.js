"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("../db/mongoose");
const app_1 = require("../app");
const index_1 = require("../index");
const supertest = require("supertest");
const account_1 = require("../models/account");
const api = supertest(app_1.default);
let user;
jest.setTimeout(1000000000);
const account3 = {
    username: "Prueba3",
    accountName: "prueba3",
    email: "prueba3@gmail.com",
    password: "prueba3prueba"
};
beforeAll(async () => {
    await account_1.Account.deleteMany({});
    await api
        .post('/signup')
        .send(account3)
        .expect(201);
    user = await api
        .post('/login')
        .send({
        accountName: "prueba3",
        password: "prueba3prueba"
    })
        .expect(201);
});
afterAll(async () => {
    await account_1.Account.deleteMany({});
    mongoose_1.default.close();
    index_1.default.close();
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
        });
    });
});
