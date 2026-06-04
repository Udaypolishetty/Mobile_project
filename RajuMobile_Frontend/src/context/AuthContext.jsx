import { createContext, useContext, useState } from "react";
import { loginUser } from "../api/authApi";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authRedirectAction, setAuthRedirectAction] = useState(null);
  const [authMode, setAuthMode] = useState("login");

 const login = async (email, password) => {
  const res = await loginUser({
    email,
    password,
  });

  localStorage.setItem("token", res.data.access);

  localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );

  setUser(res.data.user);

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
    <AuthContext.Provider 
    value={{
    user,
    login,
    logout,
    showAuthModal,
    setShowAuthModal,
    authMode,
    setAuthMode,
    requireAuth,
    runPendingAction,
  }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
