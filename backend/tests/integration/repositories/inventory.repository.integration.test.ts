import {
  beforeAll,
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
} from '@jest/globals';

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { VehicleRepository } from '../../../src/repositories/vehicle.repository.js';

import { VehicleModel } from '../../../src/models/vehicle.model.js';

describe('InventoryRepository - Purchase Vehicle', () => {
  let mongoServer: MongoMemoryServer;
  let repository: VehicleRepository;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());

    repository = new VehicleRepository();
  });

  afterAll(async () => {
    await mongoose.disconnect();

    await mongoServer.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.db?.dropDatabase();
  });

  it('should decrease vehicle quantity after purchase', async () => {
    await VehicleModel.create({
      id: 'vehicle-1',
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 5,
    });

    const vehicle = await repository.purchase('vehicle-1');

    expect(vehicle.quantity).toBe(4);

    const storedVehicle = await VehicleModel.findOne({
      id: 'vehicle-1',
    });

    expect(storedVehicle?.quantity).toBe(4);
  });
});
