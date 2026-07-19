import { useNavigate } from "react-router-dom";

import { removeToken } from "../../features/auth/services/auth.storage";

export default function Navbar() {
    const navigate = useNavigate();

    function handleLogout() {
        removeToken();
        navigate("/");
    }

    return (
        <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
            <h1 className="text-xl font-bold">
                🚗 Car Dealership
            </h1>

            <button
                type="button"
                onClick={handleLogout}
                className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
                Logout
            </button>
        </header>
    );
}