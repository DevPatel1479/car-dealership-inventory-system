import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import VehicleForm from "../components/VehicleForm";

import {
    getVehicleById,
    type Vehicle,
} from "../api/vehicle.api";

export default function VehicleEditPage() {

    const [showSuccess, setShowSuccess] =
        useState(false);
    const { id } = useParams();

    const navigate = useNavigate();

    const [vehicle, setVehicle] =
        useState<Vehicle | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        async function loadVehicle() {

            if (!id) {
                return;
            }

            try {

                const response =
                    await getVehicleById(id);

                setVehicle(response);

            } catch (error: any) {
                console.log(error);
                setError(
                    error.response?.data?.message ??
                    "Unable to update vehicle."
                );
            } finally {

                setLoading(false);

            }

        }

        loadVehicle();

    }, [id]);

    if (!id) {

        return (
            <div className="p-8 text-red-600">
                Invalid vehicle id.
            </div>
        );

    }

    if (loading) {

        return (
            <div className="p-8">
                Loading vehicle...
            </div>
        );

    }

    if (error) {

        return (
            <div className="p-8 text-red-600">
                {error}
            </div>
        );

    }

    if (!vehicle) {

        return (
            <div className="p-8 text-red-600">
                Vehicle not found.
            </div>
        );

    }
    {
        showSuccess && (

            <div
                className="
                mb-6
                rounded-lg
                border
                border-green-200
                bg-green-50
                p-4
                text-green-700
            "
            >
                ✅ Vehicle updated successfully.
                Redirecting...
            </div>

        )
    }
    return (




        <main
            className="
                min-h-screen
                bg-slate-100
                p-8
            "
        >

            <div
                className="
                    mx-auto
                    max-w-3xl
                "
            >

                <button
                    type="button"
                    onClick={() =>
                        navigate("/vehicles")
                    }
                    className="
                        mb-6
                        rounded-lg
                        bg-gray-200
                        px-4
                        py-2
                        text-sm
                        font-medium
                        hover:bg-gray-300
                    "
                >
                    ← Back to Vehicles
                </button>

                <VehicleForm
                    vehicle={vehicle}
                    onSuccess={() => {

                        setShowSuccess(true);

                        setTimeout(() => {

                            navigate("/vehicles");

                        }, 1500);

                    }}
                />

            </div>

        </main>

    );

}