import React, { createContext, useContext, useState, useEffect } from "react";
import { adminLogin, verifyToken } from "../services/api";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      verifyToken(token).then((valid) => {
        if (valid) {
          setAdmin({ username: localStorage.getItem("admin_username"), token });
        } else {
          localStorage.removeItem("admin_token");
          localStorage.removeItem("admin_username");
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const data = await adminLogin(username, password);
    localStorage.setItem("admin_token", data.token);
    localStorage.setItem("admin_username", data.username);
    setAdmin({ username: data.username, token: data.token });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_username");
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
