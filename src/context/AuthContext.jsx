import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Hydrate user from localStorage exactly once
  useEffect(() => {
    const storedUser = localStorage.getItem('apple_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  const loginContext = (userData) => {
    setUser(userData);
    localStorage.setItem('apple_user', JSON.stringify(userData));
  };

  const logoutContext = () => {
    setUser(null);
    localStorage.removeItem('apple_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
