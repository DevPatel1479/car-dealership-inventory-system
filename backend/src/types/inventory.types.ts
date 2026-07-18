export interface PurchaseVehiclePayload {
  vehicleId: string;
}

export interface VehicleInventory {
  id: string;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}
