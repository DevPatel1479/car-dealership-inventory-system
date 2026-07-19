// Global application providers (e.g. AuthProvider) will be composed here.

import { AuthProvider } from '../features/auth/context/AuthContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
