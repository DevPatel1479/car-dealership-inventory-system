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
    const response = await request(app).post('/api/vehicles').send({
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

  it('should reject access when authorization header is malformed', async () => {
    const response = await request(app)
      .post('/api/vehicles')
      .set('Authorization', 'InvalidToken')
      .send({
        make: 'Toyota',
        model: 'Corolla',
        category: 'Sedan',
        price: 20000,
        quantity: 5,
      });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: 'Invalid authentication token',
    });
  });

  it('should reject access when JWT token is invalid', async () => {
    const response = await request(app)
      .post('/api/vehicles')
      .set('Authorization', 'Bearer invalid-jwt-token')
      .send({
        make: 'Toyota',
        model: 'Corolla',
        category: 'Sedan',
        price: 20000,
        quantity: 5,
      });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({
      message: 'Invalid authentication token',
    });
  });

  it('should allow access to a protected route with a valid JWT token', async () => {
    // Arrange
    await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    const token = loginResponse.body.token;

    // Act
    const response = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        make: 'Toyota',
        model: 'Corolla',
        category: 'Sedan',
        price: 20000,
        quantity: 5,
      });

    // Assert
    expect(response.status).toBe(201);

    expect(response.body).toEqual({
      message: 'Vehicle created',
    });
  });
});
