import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiFetch } from "../lib/api";

const STORAGE_KEY = "sterling925_auth";

export interface AuthUser {
  id: string;
  name: string;
  username: string;
  email: string;
  timezone?: string;
  imageUrl?: string;
  isApproved?: boolean;
  setupStep?: number;
  /** false = Google-only (no password); forgot password does not apply. */
  passwordLoginEnabled?: boolean;
}

interface AuthState {
  accessToken: string | null;
  expiresAt: number | null;
  user: AuthUser | null;
}

export interface LoginResponse {
  message: string;
  user: AuthUser;
  accessToken: string;
  expiresAt: number;
}

interface MeResponse {
  user: AuthUser | null;
}

interface AuthContextValue extends AuthState {
  isReady: boolean;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  applyLoginResponse: (data: LoginResponse) => void;
  setSessionFromOAuth: (token: string, user: AuthUser, expiresAt?: number) => void;
  logout: () => void;
  refreshMe: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStored(): AuthState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { accessToken: null, expiresAt: null, user: null };
    }
    const parsed = JSON.parse(raw) as Partial<AuthState>;
    return {
      accessToken: typeof parsed.accessToken === "string" ? parsed.accessToken : null,
      expiresAt: typeof parsed.expiresAt === "number" ? parsed.expiresAt : null,
      user: parsed.user ?? null,
    };
  } catch {
    return { accessToken: null, expiresAt: null, user: null };
  }
}

function persist(state: AuthState) {
  if (!state.accessToken) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      accessToken: state.accessToken,
      expiresAt: state.expiresAt,
      user: state.user,
    }),
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const s = loadStored();
    setAccessToken(s.accessToken);
    setExpiresAt(s.expiresAt);
    setUser(s.user);
    setIsReady(true);
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setExpiresAt(null);
    setUser(null);
    persist({ accessToken: null, expiresAt: null, user: null });
  }, []);

  const refreshMe = useCallback(async () => {
    if (!accessToken) return;
    const { user: u } = await apiFetch<MeResponse>("/api/auth/me", {
      token: accessToken,
    });
    setUser(u);
    persist({ accessToken, expiresAt, user: u });
  }, [accessToken, expiresAt]);

  useEffect(() => {
    if (!isReady || !accessToken) return;
    refreshMe().catch(() => logout());
  }, [isReady, accessToken, refreshMe, logout]);

  const applyLoginResponse = useCallback((data: LoginResponse) => {
    setAccessToken(data.accessToken);
    setExpiresAt(data.expiresAt);
    setUser(data.user);
    persist({
      accessToken: data.accessToken,
      expiresAt: data.expiresAt,
      user: data.user,
    });
  }, []);

  const loginWithPassword = useCallback(
    async (email: string, password: string) => {
      const data = await apiFetch<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      applyLoginResponse(data);
    },
    [applyLoginResponse],
  );

  const setSessionFromOAuth = useCallback(
    (token: string, u: AuthUser, exp?: number) => {
      setAccessToken(token);
      setExpiresAt(exp ?? null);
      setUser(u);
      persist({
        accessToken: token,
        expiresAt: exp ?? null,
        user: u,
      });
    },
    [],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      accessToken,
      expiresAt,
      user,
      isReady,
      loginWithPassword,
      applyLoginResponse,
      setSessionFromOAuth,
      logout,
      refreshMe,
    }),
    [
      accessToken,
      expiresAt,
      user,
      isReady,
      loginWithPassword,
      applyLoginResponse,
      setSessionFromOAuth,
      logout,
      refreshMe,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
