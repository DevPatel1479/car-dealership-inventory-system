// Application router configuration will be defined here.

import { Route, Routes } from 'react-router-dom';

import LandingPage from './LandingPage';

import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import VehiclesPage from '../features/vehicles/pages/VehiclesPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/vehicles" element={<VehiclesPage />} />
    </Routes>
  );
}
