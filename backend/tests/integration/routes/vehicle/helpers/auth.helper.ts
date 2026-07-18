import request from 'supertest';

import app from '../../../../../src/app.js';

export async function getAuthToken(): Promise<string> {
  await request(app).post('/api/auth/register').send({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  });

  const loginResponse = await request(app).post('/api/auth/login').send({
    email: 'john@example.com',
    password: 'password123',
  });

  return loginResponse.body.token;
}