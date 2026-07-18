export interface CreateVehiclePayload {
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

export interface VehicleResponse {
  id: string;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

export interface VehicleSearchFilters {
  make?: string;
  model?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}
