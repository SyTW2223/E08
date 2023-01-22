import db from '../db/mongoose';
import app from '../app';
import server from '../index';
import * as supertest from 'supertest';
import { Account } from '../models/account';


const api = supertest(app)

jest.setTimeout(1000000000)

beforeAll(async () => {
  await Account.deleteMany({});
});

afterAll(async () => {
  await Account.deleteMany({});
  server.close();
  db.close();
});

describe('POST / - creation of a new account', () => {
  test('It must require a username', async () => {
    try {
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
    } catch (error) {
      expect(error).toBe("Account validation failed: username: A username is required");
    }
  });

  test('It must require an account name', async () => {
    try {
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
    } catch (error) {
      expect(error).toBe("Account validation failed: accountName: An account name is required");
    }
  });

  test('It must require a email', async () => {
    try {
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
    } catch (error) {
      expect(error).toBe("Account validation failed: email: An email is required");
    }
  });

  test('It must require a password', async () => {
    try {
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
    } catch (error) {
      expect(error).toBe("Account validation failed: password: A password is required");
    }
  });
  test('It should create an account', async () => {
    try {
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
    } catch (error) {
      expect(error).toBe("Account successfully created");
    }
  });
  test('It should not create an existing account', async () => {
    try {
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
    } catch (error) {
      expect(error).toBe('The account name is already in use');
    }
  });
});

describe('Post /- Test Login fuction ', () => {
  test('Login Success', async () => {
    try {
      await api
        .post('/login')
        .send({
          accountName: "prueba",
          password: "prueba1prueba"
        })
        .expect((response) => {
          expect(response.status).toBe(201);
          expect(response.body.id).not.toBeNull;
          expect(response.body.username).toBe("Prueba")
          expect(response.body.accountName).toBe("prueba")
          expect(response.body.email).toBe("prueba@gmail.com")
          expect(response.body.accessToken).not.toBeNull
        })
    } catch (error) {
      expect(error).toBe("Login Success");
    }
  });
  test('Login Problem with de password', async () => {
    try {
      await api
        .post('/login')
        .send({
          accountName: "prueba",
          password: "prueba1prueb"
        })
        .expect((response) => {
          expect(response.status).toBe(404);
          expect(response.body.error).toBe("Incorrect password")
        });
    } catch (error) {
      expect(error).toBe("Incorrect password");
    }

  });
  test('Login Problem with de account name', async () => {
    try {
      await api
        .post('/login')
        .send({
          accountName: "prueb",
          password: "prueba1prueba"
        })
        .expect((response) => {
          expect(response.status).toBe(404);
          expect(response.body.error).toBe("No account found")
        });
    } catch (error) {
      expect(error).toBe("No account found");
    }
  });
  test('login not sending user name', async () => {
    try {
      await api
        .post('/login')
        .send({
          password: "prueba1prueba"
        })
        .expect((response) => {
          expect(response.status).toBe(400);
          expect(response.body.error).toBe("An account name and password must be provided");
        }
        );
    } catch (error) {
      expect(error).toBe("An account name and password must be provided");
    }
  });
  test('login not sending password', async () => {
    try {
      await api
        .post('/login')
        .send({
          accountName: "prueba"
        })
        .expect((response) => {
          expect(response.status).toBe(400);
          expect(response.body.error).toBe("An account name and password must be provided");
        });
    } catch (error) {
      expect(error).toBe("An account name and password must be provided");
    }
  });
});

