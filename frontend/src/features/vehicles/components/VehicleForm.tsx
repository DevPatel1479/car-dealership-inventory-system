import { useState } from "react";

import {
    createVehicle,
    updateVehicle,
} from "../api/vehicle.api";

interface VehicleFormProps {
    vehicle?: {
        id: string;
        make: string;
        model: string;
        category: string;
        price: number;
        quantity: number;
    };
}

export default function VehicleForm({
    vehicle,
}: VehicleFormProps) {
    const [form, setForm] = useState({
        make: vehicle?.make ?? "",
        model: vehicle?.model ?? "",
        category: vehicle?.category ?? "",
        price: vehicle?.price?.toString() ?? "",
        quantity: vehicle?.quantity?.toString() ?? "",
    });

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(
        event: React.FormEvent,
    ) {
        event.preventDefault();

        const payload = {
            make: form.make,
            model: form.model,
            category: form.category,
            price: Number(form.price),
            quantity: Number(form.quantity),
        };

        if (vehicle) {
            await updateVehicle(
                vehicle.id,
                payload,
            );
        } else {
            await createVehicle(payload);
        }
    }

    return (
        <section className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-8">
                <h2 className="text-2xl font-bold">
                    {vehicle
                        ? "Update Vehicle"
                        : "Add Vehicle"}
                </h2>

                <p className="mt-2 text-gray-500">
                    Manage your dealership inventory.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                <div className="grid gap-6 md:grid-cols-2">
                    <label className="space-y-2">
                        <span className="font-medium">
                            Make
                        </span>

                        <input
                            aria-label="Make"
                            name="make"
                            value={form.make}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                    </label>

                    <label className="space-y-2">
                        <span className="font-medium">
                            Model
                        </span>

                        <input
                            aria-label="Model"
                            name="model"
                            value={form.model}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                    </label>

                    <label className="space-y-2">
                        <span className="font-medium">
                            Category
                        </span>

                        <input
                            aria-label="Category"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                    </label>

                    <label className="space-y-2">
                        <span className="font-medium">
                            Price
                        </span>

                        <input
                            aria-label="Price"
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                    </label>

                    <label className="space-y-2 md:col-span-2">
                        <span className="font-medium">
                            Quantity
                        </span>

                        <input
                            aria-label="Quantity"
                            name="quantity"
                            type="number"
                            value={form.quantity}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                        />
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    {vehicle
                        ? "Update Vehicle"
                        : "Create Vehicle"}
                </button>
            </form>
        </section>
    );
}