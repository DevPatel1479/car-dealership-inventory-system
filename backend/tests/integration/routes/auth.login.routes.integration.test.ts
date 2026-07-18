import { describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../src/app.js';

describe('Auth Routes - Login', () => {
  it('should authenticate user through POST /api/auth/login', async () => {
    // Arrange
    await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    // Act
    const response = await request(app).post('/api/auth/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    // Assert
    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
      token: expect.any(String),
    });
  });

  it('should reject login when request body is empty', async () => {
    const response = await request(app).post('/api/auth/login').send({});

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: 'Email is required',
    });
  });


  it('should reject access to a protected route without a JWT token', async () => {
  const response = await request(app)
    .post('/api/vehicles')
    .send({
      make: 'Toyota',
      model: 'Corolla',
      category: 'Sedan',
      price: 20000,
      quantity: 5,
    });

  expect(response.status).toBe(401);

  expect(response.body).toEqual({
    message: 'Authentication required',
  });
});
  

});
