import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function AdminProtected({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  useEffect(() => {
    auth();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const response = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (response.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        if (decoded.role === "admin") {
      setIsAuthorized(true);
      return;
    }
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAuthorized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorized(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const currentTime = Date.now() / 1000;

    if (tokenExpiration < currentTime) {
      await refreshToken();
    }
    if (decoded.role !== "admin") {
      setIsAuthorized(false);
      return;
    }
    setIsAuthorized(true);
  };

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default AdminProtected;
