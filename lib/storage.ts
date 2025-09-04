const AUTH_KEY = "auth" as const;
const USER_KEY = "user" as const;

export type StorageUser = {
  name: { first: string; last: string };
  email: string;
  picture: { large: string; medium: string; thumbnail: string };
  phone?: string;
};

export function setLoggedIn(user: StorageUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, "true");
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return (
    localStorage.getItem(AUTH_KEY) === "true" &&
    !!localStorage.getItem(USER_KEY)
  );
}

export function getUser(): StorageUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StorageUser;
  } catch {
    return null;
  }
}
