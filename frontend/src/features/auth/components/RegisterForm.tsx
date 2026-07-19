import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext";

interface RegisterFormProps {
    onSubmit?: (credentials: {
        name: string;
        email: string;
        password: string;
    }) => Promise<unknown> | void;
}

export function RegisterForm({
    onSubmit,
}: RegisterFormProps) {
    const {
        register
    } = useAuth();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setError("Invalid email format");
            return;
        }

        if (password.length < 8) {
            setError(
                "Password must be at least 8 characters",
            );
            return;
        }

        setError("");


        if (onSubmit) {

            await onSubmit({
                name,
                email,
                password,
            });

        } else {

            await register({
                name,
                email,
                password,
            });

            navigate("/login");
        }
    }

    return (
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <h1 className="mb-2 text-center text-3xl font-bold">
                Create Account
            </h1>

            <p className="mb-8 text-center text-gray-500">
                Register to manage dealership inventory.
            </p>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
            >
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block font-medium"
                    >
                        Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) =>
                            setName(event.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-3"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block font-medium"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-3"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block font-medium"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        className="w-full rounded-lg border px-4 py-3"
                    />
                </div>

                {error && (
                    <p
                        role="alert"
                        className="rounded-lg bg-red-100 p-3 text-sm text-red-700"
                    >
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                    Register
                </button>

                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}