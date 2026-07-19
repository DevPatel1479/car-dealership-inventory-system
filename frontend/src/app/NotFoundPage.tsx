import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">

            <section className="rounded-2xl bg-white p-10 text-center shadow-lg">

                <h1 className="text-6xl font-bold text-blue-600">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-semibold text-gray-900">
                    Page Not Found
                </h2>

                <p className="mt-3 text-gray-500">
                    The page you are looking for does not exist.
                </p>

                <Link
                    to="/vehicles"
                    className="
                        mt-6
                        inline-block
                        rounded-xl
                        bg-blue-600
                        px-6
                        py-3
                        font-semibold
                        text-white
                        hover:bg-blue-700
                    "
                >
                    Go To Vehicles
                </Link>

            </section>

        </main>
    );
}