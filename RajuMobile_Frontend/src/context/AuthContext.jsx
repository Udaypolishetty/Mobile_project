import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { loginUser, getMe, logoutUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]                   = useState(null);       // full user object
  const [loadingUser, setLoadingUser]     = useState(true);       // checking token on load
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode]           = useState("login");    // "login" | "register"
  const [authRedirectAction, setAuthRedirectAction] = useState(null);
  const navigate = useNavigate();

  // ── On mount: restore session from localStorage ──────────────
  useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }

  const token = localStorage.getItem("access_token");

  if (token) {
    getMe()
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => {
        setLoadingUser(false);
      });
  } else {
    setLoadingUser(false);
  }
}, []);

  // ── Login: call API, store tokens, set user ───────────────────
const login = useCallback(async (email, password) => {
  const data = await loginUser(email, password);

  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);

  setUser(data.user);
  localStorage.setItem("user", JSON.stringify(data.user));
  setShowAuthModal(false);

  if (data.user.is_staff) {
    navigate("/admin-dashboard");
  } else {
    navigate("/");
  }
}, []);

  // ── Logout: blacklist token, clear everything ─────────────────
  const logout = useCallback(async () => {
    const refresh = localStorage.getItem("refresh_token");
    try { await logoutUser(refresh); } catch { /* ignore */ }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  // ── Update local user state after profile edit ────────────────
  const updateUser = useCallback((updated) => {
    setUser((prev) => ({ ...prev, ...updated }));
  }, []);

  // ── Auth guard: show modal if not logged in ───────────────────
  const requireAuth = useCallback((action) => {
    if (user) { action(); return true; }
    setAuthRedirectAction(() => action);
    setAuthMode("login");
    setShowAuthModal(true);
    return false;
  }, [user]);

  const runPendingAction = useCallback(() => {
    if (authRedirectAction) {
      authRedirectAction();
      setAuthRedirectAction(null);
    }
  }, [authRedirectAction]);

  return (
    <AuthContext.Provider value={{
      user,
      loadingUser,
      login,
      logout,
      updateUser,
      showAuthModal,
      setShowAuthModal,
      authMode,
      setAuthMode,
      requireAuth,
      runPendingAction,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
