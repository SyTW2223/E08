import db from '../db/mongoose';
import app from '../app';
import server from '../index';
import * as supertest from 'supertest';
import { Account } from '../models/account';

const bcryptjs = require('bcryptjs');

const api = supertest(app)

jest.setTimeout(1000000000)

beforeEach(async () => {
  await Account.deleteMany({});
  await new Account({
    username: "Prueba2",
    accountName: "prueba2",
    email: "prueba2@gmail.com",
    password: await bcryptjs.hash("prueba2prueba", 10)
  }).save();
});

afterAll(async () => {
  server.close();
  db.close();
});

describe('POST / - creation of a new account', () => {
  test('It must require a username', async () => {
    await api
      .post('/signup')
      .send({
        accountName: "prueba",
        email: "prueba@gmail.com",
        password: "prueba1prueba"
      })
      .expect(response => {
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          "Account validation failed: username: A username is required"
        );
      });
  });

  test('It must require an account name', async () => {
    await api
      .post('/signup')
      .send({
        username: "Prueba",
        email: "prueba@gmail.com",
        password: "prueba1prueba"
      })
      .expect(response => {
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          "Account validation failed: accountName: An account name is required"
        );
      });
  });

  test('It must require a email', async () => {
    await api
      .post('/signup')
      .send({
        username: "Prueba",
        accountName: "prueba",
        password: "prueba1prueba"
      })
      .expect(response => {
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          "Account validation failed: email: An email is required"
        );
      });
  });

  test('It must require a password', async () => {
    await api
      .post('/signup')
      .send({
        username: "Prueba",
        accountName: "prueba",
        email: "prueba@gmail.com",
      })
      .expect(response => {
        expect(response.status).toBe(400);
        expect(response.body.message).toBe(
          "Account validation failed: password: A password is required"
        );
      });
  });
  test('It should create an account', async () => {
    await api
      .post('/signup')
      .send({
        username: "Prueba",
        accountName: "prueba",
        email: "prueba@gmail.com",
        password: "prueba1prueba"
      })
      .expect(response => {
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Account successfully created")
      });
  });
  test('It should not create an existing account', async () => {
    await new Account({
      username: "Prueba",
      accountName: "prueba",
      email: "prueba@gmail.com",
      password: "prueba1prueba"
    }).save();
    await api
      .post('/signup')
      .send({
        username: "Prueba",
        accountName: "prueba",
        email: "prueba@gmail.com",
        password: "prueba1prueba"
      })
      .expect(response => {
        expect(response.status).toBe(409);
        expect(response.body.error).toBe('The account name is already in use')
      });
  });
});

describe('Post /- Test Login fuction ', () => {
  test('Login Success', async () => {
    await api
      .post('/login')
      .send({
        accountName: "prueba2",
        password: "prueba2prueba"
      })
      .expect((response) => {
        expect(response.status).toBe(201);
        expect(response.body.id).not.toBeNull;
        expect(response.body.username).toBe("Prueba2")
        expect(response.body.accountName).toBe("prueba2")
        expect(response.body.email).toBe("prueba2@gmail.com")
        expect(response.body.accessToken).not.toBeNull
      })
  });
  test('Login Problem with de password', async () => {
    await api
      .post('/login')
      .send({
        accountName: "prueba2",
        password: "prueba1prueb"
      })
      .expect((response) => {
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Incorrect password")
      });
  });
  test('Login Problem with de account name', async () => {
    await api
      .post('/login')
      .send({
        accountName: "prueb",
        password: "prueba2prueba"
      })
      .expect((response) => {
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("No account found")
      });
  });
  test('login not sending user name', async () => {
    await api
      .post('/login')
      .send({
        password: "prueba2prueba"
      })
      .expect((response) => {
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("An account name and password must be provided");
      }
      );
  });
  test('login not sending password', async () => {
    await api
      .post('/login')
      .send({
        accountName: "prueba2"
      })
      .expect((response) => {
        expect(response.status).toBe(400);
        expect(response.body.error).toBe("An account name and password must be provided");
      });
  });
});

