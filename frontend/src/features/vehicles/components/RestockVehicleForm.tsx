import { useState } from "react";

import { restockVehicle } from "../../inventory/api/inventory.api";

interface Props {

    vehicle: {

        id: string;

        make: string;

        model: string;

        quantity: number;

    };

    onSuccess(): void;

}

export default function RestockVehicleForm({

    vehicle,

    onSuccess,

}: Props) {

    const [quantity, setQuantity] = useState("");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(
        event: React.FormEvent
    ) {

        event.preventDefault();

        setSuccess("");

        setError("");

        const value = Number(quantity);

        if (!value || value <= 0) {

            setError(
                "Quantity must be greater than zero."
            );

            return;

        }

        try {

            setLoading(true);

            await restockVehicle(
                vehicle.id,
                value,
            );

            setSuccess(
                "Vehicle restocked successfully."
            );

            setTimeout(() => {

                onSuccess();

            }, 1500);

        } catch (error: any) {

            setError(

                error?.response?.data?.message ??

                "Unable to restock vehicle."

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <section className="rounded-2xl bg-white p-8 shadow-lg">

            <h2 className="text-2xl font-bold">

                Restock Vehicle

            </h2>

            <p className="mt-2 text-gray-500">

                {vehicle.make} {vehicle.model}

            </p>

            <p className="mt-1 text-sm">

                Current Stock:

                <span className="font-semibold">

                    {" "}
                    {vehicle.quantity}

                </span>

            </p>

            {success && (

                <div className="mt-6 rounded-lg bg-green-100 p-3 text-green-700">

                    {success}

                </div>

            )}

            {error && (

                <div className="mt-6 rounded-lg bg-red-100 p-3 text-red-700">

                    {error}

                </div>

            )}

            <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
            >

                <label className="space-y-2 block">

                    <span className="font-medium">

                        Quantity to Add

                    </span>

                    <input

                        type="number"

                        value={quantity}

                        onChange={(event) =>
                            setQuantity(event.target.value)
                        }

                        className="
                            w-full
                            rounded-lg
                            border
                            px-4
                            py-3
                        "
                    />

                </label>

                <button

                    disabled={loading}

                    className="
                        w-full
                        rounded-xl
                        bg-green-600
                        py-3
                        font-semibold
                        text-white
                        hover:bg-green-700
                    "

                >

                    {loading

                        ? "Restocking..."

                        : "Restock Vehicle"}

                </button>

            </form>

        </section>

    );

}