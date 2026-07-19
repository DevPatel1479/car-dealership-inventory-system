import VehicleForm from "../components/VehicleForm";
import VehicleList from "../components/VehicleList";
import VehicleSearch from "../components/VehicleSearch";

export default function VehiclesPage() {
    return (
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
    );
}