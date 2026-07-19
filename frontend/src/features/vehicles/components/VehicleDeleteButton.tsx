import { deleteVehicle } from '../api/vehicle.api';

interface VehicleDeleteButtonProps {
  vehicleId: string;
}

export default function VehicleDeleteButton({ vehicleId }: VehicleDeleteButtonProps) {
  async function handleDelete() {
    await deleteVehicle(vehicleId);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
    >
      Delete
    </button>
  );
}
