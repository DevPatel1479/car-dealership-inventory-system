import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-16 px-8 py-12 lg:flex-row">
        {/* Left Section */}
        <div className="max-w-2xl text-center lg:text-left">
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            🚗 Modern Car Dealership Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-white lg:text-6xl">
            Find and Manage Your
            <span className="block text-blue-400">Dream Vehicle</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Browse available vehicles, manage dealership inventory, purchase cars, restock
            inventory, and securely administer your dealership from one modern dashboard.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-blue-700 hover:shadow-xl"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => navigate('/register')}
              className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-900"
            >
              Register
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full max-w-lg">
          <div className="rounded-3xl bg-white/10 p-8 shadow-2xl backdrop-blur">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Why Choose Our Platform?</h2>

              <div className="rounded-xl bg-white/10 p-5">
                <h3 className="font-semibold text-white">🚘 Vehicle Management</h3>

                <p className="mt-2 text-sm text-slate-300">
                  Create, update, delete and manage your dealership inventory effortlessly.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-5">
                <h3 className="font-semibold text-white">🔍 Powerful Search</h3>

                <p className="mt-2 text-sm text-slate-300">
                  Search vehicles by make, model, category and price instantly.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-5">
                <h3 className="font-semibold text-white">🔒 Secure Authentication</h3>

                <p className="mt-2 text-sm text-slate-300">
                  JWT protected routes with administrator inventory controls.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-5">
                <h3 className="font-semibold text-white">📦 Inventory Tracking</h3>

                <p className="mt-2 text-sm text-slate-300">
                  Purchase vehicles, monitor stock levels and restock inventory in real time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
