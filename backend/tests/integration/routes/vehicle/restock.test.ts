import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../../src/app.js';
import { vehicles } from '../../../../src/controllers/vehicle.controller.js';

import { getAuthToken } from './helpers/auth.helper.js';


describe('Vehicle Routes - Restock Vehicle', () => {

  beforeEach(() => {
    vehicles.length = 0;
  });


  it('should increase vehicle quantity after successful restock', async () => {

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
      .post(`/api/vehicles/${vehicleId}/restock`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        quantity: 10,
      });


    expect(response.status).toBe(200);


    expect(response.body).toEqual({
      id: vehicleId,
      make: 'Toyota',
      model: 'Corolla',
      category: 'Sedan',
      price: 20000,
      quantity: 15,
    });

  });

});