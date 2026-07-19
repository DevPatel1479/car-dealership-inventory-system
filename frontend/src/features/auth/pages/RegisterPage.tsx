import { useNavigate } from "react-router-dom";

import { registerUser } from "../api/auth.api";
import { RegisterForm } from "../components/RegisterForm";

export default function RegisterPage() {
    const navigate = useNavigate();

    async function handleRegister(credentials: {
        name: string;
        email: string;
        password: string;
    }) {
        await registerUser(credentials);

        navigate("/login");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100">
            <RegisterForm onSubmit={handleRegister} />
        </main>
    );
}