import {
    useEffect,
    useState,
} from 'react';

import {
    getVehicles,
    type Vehicle,
} from '../api/vehicle.api';

import {
    purchaseVehicle,
} from '../../inventory/api/inventory.api';



export default function VehicleList() {

    const [
        vehicles,
        setVehicles,
    ] = useState<Vehicle[]>([]);



    async function loadVehicles() {

        const response =
            await getVehicles();


        setVehicles(
            response,
        );

    }



    useEffect(() => {

        loadVehicles();

    }, []);




    async function handlePurchase(
        id: string,
    ) {

        await purchaseVehicle(
            id,
        );


        await loadVehicles();

    }




    return (

        <div>

            {
                vehicles.map(
                    (vehicle) => (

                        <div
                            key={vehicle.id}
                        >

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
                                    handlePurchase(
                                        vehicle.id,
                                    )
                                }
                            >
                                Purchase
                            </button>


                        </div>

                    ),
                )
            }

        </div>

    );

}