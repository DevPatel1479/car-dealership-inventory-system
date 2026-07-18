import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../../src/app.js';

import { validVehicle } from './fixtures/vehicle.fixture.js';
import { getAuthToken } from './helpers/auth.helper.js';
import { VehicleModel } from '../../../../src/models/vehicle.model.js';

describe('Vehicle Routes - List Vehicles', () => {
  beforeEach(async () => {
    await VehicleModel.deleteMany({});
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
});
