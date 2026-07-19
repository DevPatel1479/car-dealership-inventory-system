import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';



import { connectDatabase } from '../src/config/database.js';
import { VehicleModel } from '../src/models/vehicle.model.js';

async function seedVehicles(): Promise<void> {
  await connectDatabase();

  console.log('Connected to MongoDB');

  await VehicleModel.deleteMany({});

  const vehicles = [
    {
      make: 'Toyota',
      model: 'Camry',
      category: 'Sedan',
    },
    {
      make: 'Toyota',
      model: 'Corolla',
      category: 'Sedan',
    },
    {
      make: 'Honda',
      model: 'City',
      category: 'Sedan',
    },
    {
      make: 'Honda',
      model: 'Civic',
      category: 'Sedan',
    },
    {
      make: 'Hyundai',
      model: 'Creta',
      category: 'SUV',
    },
    {
      make: 'Hyundai',
      model: 'Verna',
      category: 'Sedan',
    },
    {
      make: 'Mahindra',
      model: 'Scorpio',
      category: 'SUV',
    },
    {
      make: 'Mahindra',
      model: 'XUV700',
      category: 'SUV',
    },
    {
      make: 'Tata',
      model: 'Nexon',
      category: 'SUV',
    },
    {
      make: 'Tata',
      model: 'Harrier',
      category: 'SUV',
    },
    {
      make: 'Ford',
      model: 'Endeavour',
      category: 'SUV',
    },
    {
      make: 'BMW',
      model: 'X5',
      category: 'Luxury SUV',
    },
    {
      make: 'BMW',
      model: 'M4',
      category: 'Sports',
    },
    {
      make: 'Mercedes',
      model: 'C-Class',
      category: 'Luxury Sedan',
    },
    {
      make: 'Audi',
      model: 'A4',
      category: 'Luxury Sedan',
    },
    {
      make: 'Tesla',
      model: 'Model 3',
      category: 'Electric',
    },
    {
      make: 'Tesla',
      model: 'Model Y',
      category: 'Electric',
    },
  ].map((vehicle, index) => ({
    id: randomUUID(),
    ...vehicle,

    price: faker.number.int({
      min: 700000,
      max: 9000000,
    }),

    quantity:
      index % 5 === 0
        ? 0
        : faker.number.int({
            min: 1,
            max: 12,
          }),
  }));

  await VehicleModel.insertMany(vehicles);

  console.log(`Seeded ${vehicles.length} vehicles`);

  await mongoose.disconnect();

  console.log('Database connection closed');
}

seedVehicles().catch(async (error) => {
  console.error(error);

  await mongoose.disconnect();

  process.exit(1);
  
});