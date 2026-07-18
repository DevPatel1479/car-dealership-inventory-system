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

describe('VehicleRepository', () => {
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

  it('should persist a vehicle', async () => {
    await repository.create({
      id: 'vehicle-1',

      make: 'Toyota',

      model: 'Camry',

      category: 'Sedan',

      price: 25000,

      quantity: 5,
    });

    const vehicle = await VehicleModel.findOne({
      id: 'vehicle-1',
    });

    expect(vehicle).not.toBeNull();

    expect(vehicle?.make).toBe('Toyota');
  });

  it('should return all vehicles', async () => {
    await repository.create({
      id: 'vehicle-1',
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 5,
    });

    await repository.create({
      id: 'vehicle-2',
      make: 'BMW',
      model: 'X5',
      category: 'SUV',
      price: 60000,
      quantity: 3,
    });

    const vehicles = await repository.findAll();

    expect(vehicles).toHaveLength(2);

    expect(vehicles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'vehicle-1',
          make: 'Toyota',
          model: 'Camry',
        }),

        expect.objectContaining({
          id: 'vehicle-2',
          make: 'BMW',
          model: 'X5',
        }),
      ]),
    );
  });

  it('should search vehicles by make', async () => {
    await repository.create({
      id: 'vehicle-1',
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 5,
    });

    await repository.create({
      id: 'vehicle-2',
      make: 'BMW',
      model: 'X5',
      category: 'SUV',
      price: 60000,
      quantity: 3,
    });

    const vehicles = await repository.search({
      make: 'Toyota',
    });

    expect(vehicles).toHaveLength(1);

    expect(vehicles[0]).toEqual(
      expect.objectContaining({
        id: 'vehicle-1',
        make: 'Toyota',
        model: 'Camry',
      }),
    );
  });

  it('should update vehicle details', async () => {
    await repository.create({
      id: 'vehicle-1',
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
      price: 25000,
      quantity: 5,
    });

    const updatedVehicle = await repository.update('vehicle-1', {
      price: 30000,
      quantity: 10,
    });

    expect(updatedVehicle).toEqual(
      expect.objectContaining({
        id: 'vehicle-1',
        make: 'Toyota',
        model: 'Camry',
        price: 30000,
        quantity: 10,
      }),
    );

    const vehicleFromDatabase = await VehicleModel.findOne({
      id: 'vehicle-1',
    });

    expect(vehicleFromDatabase?.price).toBe(30000);

    expect(vehicleFromDatabase?.quantity).toBe(10);
  });
});
