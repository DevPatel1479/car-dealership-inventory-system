import {
    useNavigate,
} from 'react-router-dom';


export default function LandingPage() {

    const navigate =
        useNavigate();

    return (

        <main className="min-h-screen flex flex-col items-center justify-center gap-6">

            <h1 className="text-4xl font-bold">
                Car Dealership Inventory System
            </h1>

            <div className="flex gap-4">

                <button
                    type="button"
                    className="rounded bg-blue-600 px-6 py-2 text-white"
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>

                <button
                    type="button"
                    className="rounded bg-green-600 px-6 py-2 text-white"
                >
                    Register
                </button>

            </div>

        </main>

    );

}