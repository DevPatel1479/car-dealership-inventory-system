import type { Vehicle } from "../api/vehicle.api";

interface VehicleCardProps {
    vehicle: Vehicle;
    onPurchase(id: string): Promise<void>;
}

export default function VehicleCard({
    vehicle,
    onPurchase,
}: VehicleCardProps) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        {vehicle.make} {vehicle.model}
                    </h2>

                    <p className="mt-2 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        {vehicle.category}
                    </p>
                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 font-bold text-green-700">
                    ${vehicle.price}
                </span>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500">
                        Stock
                    </p>

                    <p
                        className={`font-bold ${vehicle.quantity === 0
                                ? "text-red-600"
                                : "text-green-600"
                            }`}
                    >
                        {vehicle.quantity}
                    </p>
                </div>

                <button
                    disabled={vehicle.quantity === 0}
                    onClick={() => onPurchase(vehicle.id)}
                    className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                    {vehicle.quantity === 0
                        ? "Out of Stock"
                        : "Purchase"}
                </button>
            </div>
        </div>
    );
}