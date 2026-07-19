import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getVehicleById,
} from "../api/vehicle.api";

import RestockVehicleForm from "../components/RestockVehicleForm";

export default function VehicleRestockPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [vehicle, setVehicle] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function loadVehicle() {

            if (!id) {
                return;
            }

            try {

                const response =
                    await getVehicleById(id);

                setVehicle(response);

            } catch {

                setError("Unable to load vehicle.");

            } finally {

                setLoading(false);

            }

        }

        loadVehicle();

    }, [id]);

    if (loading) {
        return <div className="p-8">Loading vehicle...</div>;
    }

    if (error) {
        return <div className="p-8 text-red-600">{error}</div>;
    }

    if (!vehicle) {
        return <div className="p-8 text-red-600">Vehicle not found.</div>;
    }

    return (

        <main className="min-h-screen bg-slate-100 p-8">

            <div className="mx-auto max-w-3xl">

                <button
                    type="button"
                    onClick={() => navigate("/vehicles")}
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
                    ← Back
                </button>

                <RestockVehicleForm

                    vehicle={vehicle}

                    onSuccess={() =>
                        navigate("/vehicles")
                    }

                />

            </div>

        </main>

    );

}