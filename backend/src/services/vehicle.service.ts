export class VehicleService {
  constructor(
    private readonly vehicleRepository: any,
  ) {}

  async create(vehicleData: {
    make: string;
    model: string;
    category: string;
    price: number;
    quantity: number;
  }) {
    return this.vehicleRepository.create(vehicleData);
  }
}