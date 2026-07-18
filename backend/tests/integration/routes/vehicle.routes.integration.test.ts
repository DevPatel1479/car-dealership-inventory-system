import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../src/app.js';
import { vehicles } from '../../../src/controllers/vehicle.controller.js';

describe('Vehicle Routes - Create Vehicle', () => {
  beforeEach(() => {
    // Clear temporary vehicle storage so each test starts with a clean state.
    vehicles.length = 0;
  });

  async function getAuthToken(): Promise<string> {
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

  const validVehicle = {
    make: 'Toyota',
    model: 'Corolla',
    category: 'Sedan',
    price: 20000,
    quantity: 5,
  };

  it('should reject vehicle creation when request body is empty', async () => {
    const token = await getAuthToken();

    const response = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: 'Make is required',
    });
  });

  it('should reject vehicle creation when price is missing', async () => {
    const token = await getAuthToken();

    const response = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        make: validVehicle.make,
        model: validVehicle.model,
        category: validVehicle.category,
        quantity: validVehicle.quantity,
      });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: 'Price is required',
    });
  });

  it('should return created vehicle details after successful creation', async () => {
    const token = await getAuthToken();

    const response = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send(validVehicle);

    expect(response.status).toBe(201);

    expect(response.body).toEqual({
      id: expect.any(String),
      ...validVehicle,
    });
  });

  it('should return all available vehicles through GET /api/vehicles', async () => {
    const token = await getAuthToken();

    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send(validVehicle);

    const response = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual([
      {
        id: expect.any(String),
        ...validVehicle,
      },
    ]);
  });

  it('should search vehicles by make', async () => {
    // Arrange
    const token = await getAuthToken();

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

    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        make: 'Honda',
        model: 'Civic',
        category: 'Sedan',
        price: 18000,
        quantity: 3,
      });

    // Act
    const response = await request(app)
      .get('/api/vehicles/search?make=Toyota')
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
  it('should search vehicles by model', async () => {
    // Arrange
    const token = await getAuthToken();

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

    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        make: 'Honda',
        model: 'Civic',
        category: 'Sedan',
        price: 18000,
        quantity: 3,
      });

    // Act
    const response = await request(app)
      .get('/api/vehicles/search?model=Civic')
      .set('Authorization', `Bearer ${token}`);

    // Assert
    expect(response.status).toBe(200);

    expect(response.body).toEqual([
      {
        id: expect.any(String),
        make: 'Honda',
        model: 'Civic',
        category: 'Sedan',
        price: 18000,
        quantity: 3,
      },
    ]);
  });
});
