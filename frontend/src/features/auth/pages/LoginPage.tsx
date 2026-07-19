import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {

    return (

        <main className="min-h-screen flex items-center justify-center">

            <div className="w-full max-w-md">

                <h1 className="mb-6 text-3xl font-bold">
                    Login
                </h1>

                <LoginForm />

            </div>

        </main>

    );

}