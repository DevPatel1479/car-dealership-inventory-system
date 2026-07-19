import {
    useEffect,
    useState,
} from "react";

import {
    getVehicles,
    type Vehicle,
} from "../api/vehicle.api";

import {
    purchaseVehicle,
} from "../../inventory/api/inventory.api";

import VehicleCard from "./VehicleCard";

export default function VehicleList() {
    const [vehicles, setVehicles] =
        useState<Vehicle[]>([]);

    const [loading, setLoading] =
        useState(true);

    async function loadVehicles() {
        setLoading(true);

        const response =
            await getVehicles();

        setVehicles(response);

        setLoading(false);
    }

    useEffect(() => {
        loadVehicles();
    }, []);

    async function handlePurchase(
        id: string,
    ) {
        await purchaseVehicle(id);

        await loadVehicles();
    }

    if (loading) {
        return (
            <div className="py-20 text-center text-gray-500">
                Loading vehicles...
            </div>
        );
    }

    if (vehicles.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed bg-white p-16 text-center shadow-sm">
                <h2 className="text-2xl font-semibold">
                    No Vehicles Found
                </h2>

                <p className="mt-3 text-gray-500">
                    Start by creating your first
                    vehicle.
                </p>
            </div>
        );
    }

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        Available Vehicles
                    </h2>

                    <p className="text-gray-500">
                        {vehicles.length} vehicle
                        {vehicles.length > 1
                            ? "s"
                            : ""}{" "}
                        available
                    </p>
                </div>
            </div>

            <div
                className="
                    grid
                    gap-6
                    sm:grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                "
            >
                {vehicles.map((vehicle) => (
                    <VehicleCard
                        key={vehicle.id}
                        vehicle={vehicle}
                        onPurchase={
                            handlePurchase
                        }
                    />
                ))}
            </div>
        </section>
    );
}