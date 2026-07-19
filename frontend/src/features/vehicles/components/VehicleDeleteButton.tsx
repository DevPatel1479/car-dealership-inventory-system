import {
    deleteVehicle,
} from '../api/vehicle.api';


interface VehicleDeleteButtonProps {
    vehicleId: string;
}


export default function VehicleDeleteButton(
    {
        vehicleId,
    }: VehicleDeleteButtonProps,
) {

    async function handleDelete() {

        await deleteVehicle(
            vehicleId,
        );

    }


    return (
        <button
            type="button"
            onClick={handleDelete}
        >
            Delete
        </button>
    );

}