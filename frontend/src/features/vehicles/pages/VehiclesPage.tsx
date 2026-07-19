import { useEffect, useState } from 'react';

import VehicleList from '../components/VehicleList';
import VehicleSearch from '../components/VehicleSearch';

import Navbar from '../../../components/layout/Navbar';
import DashboardHeader from '../../../components/layout/DashboardHeader';

import { getVehicles, searchVehicles, type Vehicle } from '../api/vehicle.api';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [loading, setLoading] = useState(true);

  async function loadVehicles() {
    setLoading(true);

    const response = await getVehicles();

    setVehicles(response);

    setLoading(false);
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  function handlePurchaseUpdate(id: string) {
    setVehicles((previous) =>
      previous.map((vehicle) =>
        vehicle.id === id
          ? {
              ...vehicle,
              quantity: vehicle.quantity - 1,
            }
          : vehicle,
      ),
    );
  }

  async function handleSearch(filters: {
    make?: string;
    model?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
  }) {
    const response = await searchVehicles(filters);

    setVehicles(response);
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main
        className="
                    mx-auto
                    max-w-7xl
                    px-4
                    py-8
                "
      >
        <DashboardHeader
          title="Vehicle Inventory"
          subtitle="Browse and purchase available vehicles."
        />

        <section
          className="
                        mt-8
                        space-y-8
                    "
        >
          <VehicleSearch onSearch={handleSearch} />

          <VehicleList
            vehicles={vehicles}
            loading={loading}
            onPurchaseSuccess={handlePurchaseUpdate}
          />
        </section>
      </main>
    </div>
  );
}
