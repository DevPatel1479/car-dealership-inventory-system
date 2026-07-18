import { describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../src/app.js';

describe('Auth Routes - Register', () => {
  it('should register a new user through POST /api/auth/register', async () => {
    const response = await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    expect(response.status).toBe(201);

    expect(response.body).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
    });
  });

  it('should reject registration when request body is empty', async () => {
    const response = await request(app).post('/api/auth/register').send({});

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: 'Name is required',
    });
  });
});



