import { useNavigate } from 'react-router-dom';

import { removeAuth } from '../../features/auth/services/auth.storage';

export default function Navbar() {
    const navigate = useNavigate();

    function handleLogout() {
        removeAuth();
        navigate('/login');
    }

    return (
        <header
            className="
sticky
top-0
z-50
border-b
bg-white/90
backdrop-blur
shadow-sm
"
        >
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
                <h1 className="text-xl font-bold text-blue-600">Car Dealership</h1>

                <button
                    onClick={handleLogout}
                    className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
