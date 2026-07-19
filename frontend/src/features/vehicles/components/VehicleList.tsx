import { useState } from 'react';

import type { Vehicle } from '../api/vehicle.api';

import { purchaseVehicle } from '../../inventory/api/inventory.api';

import VehicleCard from './VehicleCard';

interface VehicleListProps {
  vehicles: Vehicle[];
  loading: boolean;
  onPurchaseSuccess(id: string): void;
}

export default function VehicleList({ vehicles, loading, onPurchaseSuccess }: VehicleListProps) {
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  async function handlePurchase(id: string) {
    setPurchasingId(id);

    try {
      await purchaseVehicle(id);

      onPurchaseSuccess(id);
    } catch (error) {
      console.error('Purchase failed', error);
    } finally {
      setPurchasingId(null);
    }
  }
  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading vehicles...</div>;
  }

  if (vehicles.length === 0) {
    return (
      <div
        className="
                rounded-2xl
                border
                border-dashed
                bg-white
                p-16
                text-center
                shadow-sm
            "
      >
        <h2
          className="
                    text-2xl
                    font-semibold
                    text-gray-900
                "
        >
          No Vehicles Found
        </h2>

        <p
          className="
                    mt-3
                    text-gray-500
                "
        >
          No vehicles match your search. Try changing your filters.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Available Vehicles</h2>

          <p className="text-gray-500">
            {vehicles.length} vehicle
            {vehicles.length > 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      <div
        className="
        grid
        gap-6
        sm:grid-cols-1
        lg:grid-cols-2
        2xl:grid-cols-3
    "
      >
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onPurchase={handlePurchase}
            isPurchasing={purchasingId === vehicle.id}
          />
        ))}
      </div>
    </section>
  );
}
