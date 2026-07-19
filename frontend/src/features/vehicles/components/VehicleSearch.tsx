import { useState } from "react";

import {
    searchVehicles,
} from "../api/vehicle.api";

export default function VehicleSearch() {
    const [make, setMake] = useState("");

    async function handleSearch() {
        await searchVehicles({
            make,
        });
    }

    return (
        <section className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">
                Search Vehicles
            </h2>

            <div className="flex flex-col gap-4 md:flex-row">
                <input
                    placeholder="Search by make..."
                    value={make}
                    onChange={(event) =>
                        setMake(event.target.value)
                    }
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                />

                <button
                    type="button"
                    onClick={handleSearch}
                    className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    Search
                </button>
            </div>
        </section>
    );
}