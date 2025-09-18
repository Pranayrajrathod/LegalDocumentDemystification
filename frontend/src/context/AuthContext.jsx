import { createContext, useState } from "react";

// Create Context
export const AuthContext = createContext();

// Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Example: login and logout functions (can be connected to backend later)
  const login = (userData) => {
    setUser(userData);
    // Could also store in localStorage if persistence is needed
  };

  const logout = () => {
    setUser(null);
    // Could also clear localStorage here
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
