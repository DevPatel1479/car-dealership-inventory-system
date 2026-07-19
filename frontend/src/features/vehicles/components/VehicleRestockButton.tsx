import {
    restockVehicle,
} from '../../inventory/api/inventory.api';


interface VehicleRestockButtonProps {
    vehicleId: string;
}


export default function VehicleRestockButton(
    {
        vehicleId,
    }: VehicleRestockButtonProps,
) {

    async function handleRestock() {

        await restockVehicle(
            vehicleId,
        );

    }


    return (
        <button
            type="button"
            onClick={handleRestock}
        >
            Restock
        </button>
    );

}