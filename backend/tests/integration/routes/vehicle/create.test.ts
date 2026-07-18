import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../../src/app.js';
import { VehicleModel } from '../../../../src/models/vehicle.model.js';

import { validVehicle } from './fixtures/vehicle.fixture.js';
import { getAuthToken } from './helpers/auth.helper.js';

describe('Vehicle Routes - Create Vehicle', () => {
  beforeEach(async () => {
    await VehicleModel.deleteMany({});
  });

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
});
