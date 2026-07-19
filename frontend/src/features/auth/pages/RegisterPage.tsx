import { RegisterForm } from "../components/RegisterForm";

export default function RegisterPage() {

    return (

        <main className="min-h-screen flex items-center justify-center">

            <div className="w-full max-w-md">

                <h1 className="mb-6 text-3xl font-bold">
                    Register
                </h1>

                <RegisterForm />

            </div>

        </main>

    );

}