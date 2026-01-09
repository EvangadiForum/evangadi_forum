// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext(null);

// Custom hook to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // This is the key state to track loading

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false); // Once data is checked, set loading to false
  }, []);

  const loginUser = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    sessionStorage.setItem("user", JSON.stringify(userData));
    sessionStorage.setItem("token", jwtToken);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {!loading ? children : <p>Loading...</p>}{" "}
      {/* Show loading only if still loading */}
    </AuthContext.Provider>
  );
};
