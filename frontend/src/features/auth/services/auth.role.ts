import { getToken } from './auth.storage';

export function getUserRole(): string | undefined {
  const token = getToken();

  if (!token) {
    return undefined;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    return payload.role;
  } catch {
    return undefined;
  }
}

export function isAdmin(): boolean {
  return getUserRole() === 'admin';
}
