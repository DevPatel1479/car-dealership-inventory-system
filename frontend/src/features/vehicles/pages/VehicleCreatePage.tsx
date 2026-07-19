import { useState } from "react";

import { useNavigate } from "react-router-dom";

import VehicleForm from "../components/VehicleForm";

export default function VehicleCreatePage() {

    const navigate = useNavigate();

    const [showSuccess, setShowSuccess] =
        useState(false);

    function handleSuccess() {

        setShowSuccess(true);

        setTimeout(() => {

            navigate("/vehicles");

        }, 1800);

    }

    return (

        <div className="min-h-screen bg-slate-100">

            <main
                className="
                    mx-auto
                    max-w-4xl
                    px-4
                    py-10
                    relative
                "
            >

                {
                    showSuccess && (

                        <div
                            className="
                                fixed
                                top-6
                                right-6
                                z-50
                                rounded-xl
                                bg-green-600
                                px-6
                                py-4
                                text-white
                                shadow-xl
                                animate-pulse
                            "
                        >
                            ✅ Vehicle created successfully.
                            Redirecting...
                        </div>

                    )
                }

                <VehicleForm
                    onSuccess={handleSuccess}
                />

            </main>

        </div>

    );

}