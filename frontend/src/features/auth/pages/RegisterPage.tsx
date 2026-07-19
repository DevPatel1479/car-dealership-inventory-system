import { RegisterForm } from "../components/RegisterForm";


export default function RegisterPage() {

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">

            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">

                <RegisterForm />

            </div>

        </main>
    );
}