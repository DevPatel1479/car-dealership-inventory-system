import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/auth.api";
import { LoginForm } from "../components/LoginForm";
import { saveToken } from "../services/auth.storage";

export default function LoginPage() {
    const navigate = useNavigate();

    async function handleLogin(credentials: {
        email: string;
        password: string;
    }) {
        const response = await loginUser(credentials);

        saveToken(response.token);

        navigate("/vehicles");
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
                <LoginForm onSubmit={handleLogin} />
            </div>
        </main>
    );
}