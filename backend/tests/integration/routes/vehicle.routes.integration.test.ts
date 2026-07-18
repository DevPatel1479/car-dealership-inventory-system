import { describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../src/app.js';

describe('Vehicle Routes - Create Vehicle', () => {
  it('should reject vehicle creation when request body is empty', async () => {
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
      .send({});

    // Assert
    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: 'Make is required',
    });
  });

  it('should reject vehicle creation when price is missing', async () => {
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
        quantity: 5,
      });

    // Assert
    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: 'Price is required',
    });
  });

  it('should return created vehicle details after successful creation', async () => {
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
      id: expect.any(String),
      make: 'Toyota',
      model: 'Corolla',
      category: 'Sedan',
      price: 20000,
      quantity: 5,
    });
  });

  it('should return all available vehicles through GET /api/vehicles', async () => {
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

    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        make: 'Toyota',
        model: 'Corolla',
        category: 'Sedan',
        price: 20000,
        quantity: 5,
      });

    // Act
    const response = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);

    expect(response.body).toEqual([
      {
        id: expect.any(String),
        make: 'Toyota',
        model: 'Corolla',
        category: 'Sedan',
        price: 20000,
        quantity: 5,
      },
    ]);
  });
});
