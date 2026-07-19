import { useEffect, useState } from 'react';

import VehicleList from '../components/VehicleList';
import VehicleSearch from '../components/VehicleSearch';
import VehicleForm from '../components/VehicleForm';


import { useNavigate } from "react-router-dom";
import Navbar from '../../../components/layout/Navbar';
import DashboardHeader from '../../../components/layout/DashboardHeader';

import {
    getVehicles,
    searchVehicles,
    type Vehicle,
} from '../api/vehicle.api';

import { isAdmin } from '../../auth/services/auth.role';


export default function VehiclesPage() {

    const admin = isAdmin();

    const navigate = useNavigate();
    const [
        vehicles,
        setVehicles
    ] = useState<Vehicle[]>([]);


    const [
        loading,
        setLoading
    ] = useState(true);



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




    function handlePurchaseUpdate(
        id: string
    ) {

        setVehicles(previous =>
            previous.map(vehicle =>
                vehicle.id === id
                    ?
                    {
                        ...vehicle,
                        quantity:
                            vehicle.quantity - 1
                    }
                    :
                    vehicle
            )
        );

    }





    async function handleSearch(filters: {
        make?: string;
        model?: string;
        category?: string;
        minPrice?: number;
        maxPrice?: number;
    }) {


        const response =
            await searchVehicles(filters);


        setVehicles(response);

    }





    return (

        <div className="min-h-screen bg-slate-100">


            <Navbar />


            <main
                className="
                mx-auto
                max-w-7xl
                px-4
                py-8
                "
            >


                <DashboardHeader

                    title={
                        admin
                            ?
                            "Admin Vehicle Management"
                            :
                            "Vehicle Inventory"
                    }


                    subtitle={
                        admin
                            ?
                            "Manage dealership inventory and vehicles."
                            :
                            "Browse available vehicles and purchase cars."
                    }

                />

                {
                    admin && (

                        <div
                            className="
            mt-6
            flex
            justify-end
            "
                        >

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/vehicles/create")
                                }
                                className="
                rounded-xl
                bg-blue-600
                px-5
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
                "
                            >
                                + Add Vehicle
                            </button>


                        </div>

                    )
                }










                <section
                    className="
                    mt-8
                    space-y-8
                    "
                >


                    <VehicleSearch

                        onSearch={
                            handleSearch
                        }

                    />



                    <VehicleList

                        vehicles={
                            vehicles
                        }

                        loading={
                            loading
                        }

                        onPurchaseSuccess={
                            handlePurchaseUpdate
                        }

                        isAdmin={
                            admin
                        }

                    />


                </section>


            </main>


        </div>

    );
}