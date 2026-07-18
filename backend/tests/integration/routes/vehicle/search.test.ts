import { beforeEach, describe, expect, it } from '@jest/globals';
import request from 'supertest';

import app from '../../../../src/app.js';
import { vehicles } from '../../../../src/controllers/vehicle.controller.js';

import { getAuthToken } from './helpers/auth.helper.js';


describe('Vehicle Routes - Search Vehicles', () => {

  beforeEach(() => {
    vehicles.length = 0;
  });


  it('should search vehicles by make', async () => {
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


    const response = await request(app)
      .get('/api/vehicles/search?make=Toyota')
      .set('Authorization', `Bearer ${token}`);


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
    const token = await getAuthToken();


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


    const response = await request(app)
      .get('/api/vehicles/search?model=Civic')
      .set('Authorization', `Bearer ${token}`);


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



  it('should search vehicles by category', async () => {
    const token = await getAuthToken();


    await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${token}`)
      .send({
        make: 'BMW',
        model: 'X5',
        category: 'SUV',
        price: 60000,
        quantity: 2,
      });


    const response = await request(app)
      .get('/api/vehicles/search?category=SUV')
      .set('Authorization', `Bearer ${token}`);


    expect(response.status).toBe(200);


    expect(response.body).toEqual([
      {
        id: expect.any(String),
        make: 'BMW',
        model: 'X5',
        category: 'SUV',
        price: 60000,
        quantity: 2,
      },
    ]);
  });



  it('should search vehicles by price range', async () => {
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
        make: 'BMW',
        model: 'X5',
        category: 'SUV',
        price: 60000,
        quantity: 2,
      });


    const response = await request(app)
      .get('/api/vehicles/search?minPrice=15000&maxPrice=30000')
      .set('Authorization', `Bearer ${token}`);


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