// Restricts access to administrator-only routes.

import { Navigate, Outlet } from 'react-router-dom';

import { getToken } from '../features/auth/services/auth.storage';

interface JwtPayload {
  role?: string;
}

function parseRole(): string | undefined {
  const token = getToken();

  if (!token) {
    return undefined;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as JwtPayload;

    return payload.role;
  } catch {
    return undefined;
  }
}

export default function AdminRoute() {
  const token = getToken();

  const role = parseRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/vehicles" replace />;
  }

  return <Outlet />;
}
