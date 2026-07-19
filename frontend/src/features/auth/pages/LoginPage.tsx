import { LoginForm } from "../components/LoginForm";


export default function LoginPage() {

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">

            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">

                <LoginForm />

            </div>

        </main>
    );
}