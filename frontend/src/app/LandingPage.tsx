import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <section
        className="
          mx-auto
          flex
          min-h-screen
          max-w-7xl
          flex-col
          items-center
          justify-center
          gap-10
          px-6
          py-10
          lg:flex-row
          lg:gap-16
          lg:px-10
        "
      >
        {/* Introduction */}
        <div className="max-w-2xl text-center lg:text-left">
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            🚗 Modern Car Dealership Platform
          </span>

          <h1
            className="
              mt-6
              text-4xl
              font-extrabold
              leading-tight
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Find and Manage Your
            <span className="block text-blue-400">Dream Vehicle</span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            A modern dealership inventory system where customers can browse, search and purchase
            vehicles while administrators securely manage inventory, update stock and maintain the
            dealership.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="
                w-full
                rounded-xl
                bg-blue-600
                px-8
                py-4
                font-semibold
                text-white
                shadow-lg
                transition
                hover:bg-blue-700
                hover:shadow-xl
                sm:w-auto
              "
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => navigate('/register')}
              className="
                w-full
                rounded-xl
                border
                border-white/30
                bg-white/10
                px-8
                py-4
                font-semibold
                text-white
                backdrop-blur
                transition
                hover:bg-white
                hover:text-slate-900
                sm:w-auto
              "
            >
              Register
            </button>
          </div>
        </div>

        {/* Platform Features */}
        <div className="w-full max-w-xl">
          <div className="rounded-3xl bg-white/10 p-8 shadow-2xl backdrop-blur">
            <h2 className="mb-6 text-2xl font-bold text-white">Platform Features</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-5">
                <h3 className="font-semibold text-white">🚘 Vehicle Management</h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Create, update and organize dealership inventory with ease.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-5">
                <h3 className="font-semibold text-white">🔍 Smart Search</h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Quickly search vehicles by make, model, category or price.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-5">
                <h3 className="font-semibold text-white">🔒 Secure Access</h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  JWT authentication protects inventory and administrative actions.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-5">
                <h3 className="font-semibold text-white">📦 Inventory Tracking</h3>

                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Purchase vehicles and monitor stock levels in real time.
                </p>
              </div>
            </div>

            {/* User Roles */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-blue-400/30 bg-blue-500/10 p-5">
                <h3 className="text-lg font-semibold text-white">👤 User</h3>

                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• Browse available vehicles</li>
                  <li>• Search and filter inventory</li>
                  <li>• Purchase vehicles</li>
                </ul>
              </div>

              <div className="rounded-xl border border-green-400/30 bg-green-500/10 p-5">
                <h3 className="text-lg font-semibold text-white">👑 Administrator</h3>

                <ul className="mt-3 space-y-2 text-sm text-slate-300">
                  <li>• Add new vehicles</li>
                  <li>• Update vehicle details</li>
                  <li>• Restock inventory</li>
                  <li>• Delete vehicles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
