import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-lg px-4 py-2 transition ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <aside className="hidden w-64 border-r bg-white lg:block">
      <div className="border-b p-6">
        <h2 className="text-xl font-bold text-blue-600">Car Inventory</h2>
      </div>

      <nav className="space-y-2 p-4">
        <NavLink to="/vehicles" className={linkClass}>
          🚗 Vehicles
        </NavLink>
      </nav>
    </aside>
  );
}
