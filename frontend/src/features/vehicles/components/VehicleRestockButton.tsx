import {
    restockVehicle,
} from "../../inventory/api/inventory.api";

interface VehicleRestockButtonProps {
    vehicleId: string;
}

export default function VehicleRestockButton({
    vehicleId,
}: VehicleRestockButtonProps) {

    async function handleRestock() {
        await restockVehicle(vehicleId);
    }

    return (
        <button
            type="button"
            onClick={handleRestock}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
        >
            Restock
        </button>
    );
}