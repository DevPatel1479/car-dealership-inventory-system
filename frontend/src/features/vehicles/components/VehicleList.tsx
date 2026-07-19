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


import VehicleCard from './VehicleCard';



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

                        <VehicleCard
                            key={
                                vehicle.id
                            }
                            vehicle={
                                vehicle
                            }
                            onPurchase={
                                handlePurchase
                            }
                        />

                    ),
                )
            }

        </div>

    );

}