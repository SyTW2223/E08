import db from '../db/mongoose';
import app from '../app';
import * as supertest from 'supertest';

const api = supertest(app)

beforeAll(done => {
  done();
});

afterAll(done => {
  db.close();
  done();
});

describe('POST / - creation of a new account', () => {
  test('It must require a username', async () => {
    await api
      .post('/signup')
      .send({
        accountName: "pruebaCuenta2",
        email: "prueba@mail.com",
        password: "example"
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
        email: "prueba@mail.com",
        password: "example"
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
        accountName: "pruebaCuenta2",
        password: "cuenta123"
      })
      .expect(response => {
        expect(response.status).toBe(400);
        expect(response.body.error).toBe(
          "Account validation failed: email: An email is required"
        );
      });
  });

  test('It must require a password', async () => {
    await api
      .post('/signup')
      .send({
        username: "Prueba",
        accountName: "pruebaCuenta2",
        email: "prueba@mail.com",
      })
      .expect(response => {
        expect(response.status).toBe(400);
        expect(response.body.error).toBe(
          "Account validation failed: password: A password is required"
        );
      });
  });

  test('It should not create an existing account name', async () => {
    await api
      .post('/signup')
      .send({
        username: "Prueba",
        accountName: "pruebaCuenta",
        email: "prueba@mail.com",
        password: "example"
      })
      .expect(response => {
        expect(response.status).toBe(409);
        expect(response.body.error).toEqual(
          "The account name is already in use"
        );
      });
  });
});

