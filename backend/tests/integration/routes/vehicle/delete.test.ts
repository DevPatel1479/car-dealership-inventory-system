import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../../src/app.js';

import { getAuthToken } from './helpers/auth.helper.js';
import { VehicleModel } from '../../../../src/models/vehicle.model.js';

describe('Vehicle Routes - Delete Vehicle', () => {
  beforeEach(async () => {
    await VehicleModel.deleteMany({});
  });

  it('should delete vehicle successfully', async () => {
    const token = await getAuthToken();

    const createResponse = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        make: 'Toyota',
        model: 'Corolla',
        category: 'Sedan',
        price: 20000,
        quantity: 5,
      });

    const vehicleId = createResponse.body.id;

    const response = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);

    const getResponse = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${token}`);

    expect(getResponse.body).toEqual([]);
  });

  it('should reject vehicle deletion when user is not an admin', async () => {
    const token = await getAuthToken();

    const createResponse = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        make: 'Toyota',
        model: 'Corolla',
        category: 'Sedan',
        price: 20000,
        quantity: 5,
      });

    const vehicleId = createResponse.body.id;

    const response = await request(app)
      .delete(`/api/vehicles/${vehicleId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(403);

    expect(response.body).toEqual({
      message: 'Admin access required',
    });
  });
});
