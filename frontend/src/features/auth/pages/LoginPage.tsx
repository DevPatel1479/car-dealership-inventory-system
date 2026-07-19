import { useNavigate } from "react-router-dom";

import { LoginForm } from "../components/LoginForm";
import { loginUser } from "../api/auth.api";
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
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
            <LoginForm onSubmit={handleLogin} />
        </main>
    );
}