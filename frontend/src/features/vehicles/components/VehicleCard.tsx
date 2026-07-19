import type { Vehicle } from '../api/vehicle.api';


interface VehicleCardProps {

    vehicle: Vehicle;

    onPurchase: (
        id: string,
    ) => Promise<void>;

}



export default function VehicleCard({
    vehicle,
    onPurchase,
}: VehicleCardProps) {


    return (

        <div>


            <h2>
                {vehicle.make} {vehicle.model}
            </h2>


            <p>
                ${vehicle.price}
            </p>


            <button
                disabled={
                    vehicle.quantity === 0
                }
                onClick={() =>
                    onPurchase(
                        vehicle.id,
                    )
                }
            >

                Purchase

            </button>


        </div>

    );

}