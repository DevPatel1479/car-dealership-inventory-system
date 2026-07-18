import { describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../src/app.js';

describe('Vehicle Routes - Create Vehicle', () => {
  it('should create a new vehicle when valid details are provided', async () => {
    // Arrange
    await request(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });

    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
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
      id: expect.any(String),
      make: 'Toyota',
      model: 'Corolla',
      category: 'Sedan',
      price: 20000,
      quantity: 5,
    });
  });
});