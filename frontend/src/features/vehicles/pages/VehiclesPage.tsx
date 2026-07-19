import VehicleForm from "../components/VehicleForm";
import VehicleList from "../components/VehicleList";
import VehicleSearch from "../components/VehicleSearch";

import Navbar from "../../../../src/components/layout/Navbar";

export default function VehiclesPage() {
    return (

        <>
            <Navbar />


            <main className="mx-auto max-w-7xl space-y-8 p-8">
                <header>
                    <h1 className="text-3xl font-bold">
                        Vehicle Inventory
                    </h1>
                </header>

                <VehicleSearch />

                <VehicleForm />

                <VehicleList />
            </main>


        </>
    );
}