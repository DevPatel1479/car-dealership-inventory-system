import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../../src/app.js';

import { getAuthToken } from './helpers/auth.helper.js';
import { VehicleModel } from '../../../../src/models/vehicle.model.js';

describe('Vehicle Routes - Purchase Vehicle', () => {
  beforeEach(async () => {
    await VehicleModel.deleteMany({});
  });

  it('should decrease vehicle quantity after successful purchase', async () => {
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
      .post(`/api/vehicles/${vehicleId}/purchase`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      id: vehicleId,
      make: 'Toyota',
      model: 'Corolla',
      category: 'Sedan',
      price: 20000,
      quantity: 4,
    });
  });
});
