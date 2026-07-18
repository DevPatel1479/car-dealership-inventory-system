import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../../src/app.js';
import { vehicles } from '../../../../src/controllers/vehicle.controller.js';

import { getAuthToken } from './helpers/auth.helper.js';

describe('Vehicle Routes - Delete Vehicle', () => {
  beforeEach(() => {
    vehicles.length = 0;
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
});
