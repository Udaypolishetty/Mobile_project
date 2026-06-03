import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRedirectAction, setAuthRedirectAction] = useState(null);

  const login = (email, name) => {
    setUser({ email, name: name || email.split("@")[0] });
    setShowAuthModal(false);
  };

  const logout = () => setUser(null);

  const requireAuth = (action) => {
    if (user) return true;
    setAuthRedirectAction(() => action);
    setShowAuthModal(true);
    return false;
  };

  const runPendingAction = () => {
    if (authRedirectAction) {
      authRedirectAction();
      setAuthRedirectAction(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, showAuthModal, setShowAuthModal, requireAuth, runPendingAction }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
