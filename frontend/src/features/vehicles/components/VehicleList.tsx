import {
    useEffect,
    useState,
} from 'react';

import {
    getVehicles,
    type Vehicle,
} from '../api/vehicle.api';



export default function VehicleList() {

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);


    useEffect(() => {

        async function loadVehicles() {

            const response = await getVehicles();

            setVehicles(response);

        }


        loadVehicles();

    }, []);



    return (
        <div>

            {
                vehicles.map((vehicle) => (

                    <div
                        key={vehicle.id}
                    >

                        <h2>
                            {vehicle.make} {vehicle.model}
                        </h2>


                        <p>
                            ${vehicle.price}
                        </p>

                    </div>

                ))
            }

        </div>
    );

}