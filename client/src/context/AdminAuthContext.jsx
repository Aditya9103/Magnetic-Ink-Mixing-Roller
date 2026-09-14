import React, { createContext, useContext, useState, useEffect } from "react";
import { adminLogin, verifyToken, isTokenExpired } from "../services/api";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    const username = typeof window !== "undefined" ? localStorage.getItem("admin_username") : null;
    if (!token || !username) return null;
    // If token is already expired according to JWT exp, clear it
    if (isTokenExpired(token)) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_username");
      }
      return null;
    }
    return { username, token };
  });

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    setAdmin(null);
    try {
      if (window.__queryClient) window.__queryClient.clear();
    } catch {
      // Ignore cache clearing errors
    }
  };

  const login = async (username, password) => {
    const data = await adminLogin(username, password);
    localStorage.setItem("admin_token", data.token);
    localStorage.setItem("admin_username", data.username);
    setAdmin({ username: data.username, token: data.token });
    return data;
  };

  useEffect(() => {
    let isCurrent = true;

    if (admin?.token) {
      if (isTokenExpired(admin.token)) {
        logout();
        return;
      }

      verifyToken(admin.token)
        .then((result) => {
          if (!isCurrent) return;
          // ONLY logout if explicitly unauthorized (401/403 or expired)
          // Transient errors (network aborts, rate limits 429, 502/503) will NEVER logout
          if (result && result.valid === false) {
            logout();
          }
        })
        .catch(() => {
          // Network errors should never log out the user
        });
    }

    return () => {
      isCurrent = false;
    };
  }, [admin?.token]);

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading: false }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
