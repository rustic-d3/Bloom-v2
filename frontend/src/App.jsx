import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtected from "./components/AdminProtected";
import api from "./api";
import ChildrenForm from "./components/ChildrenForm";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Navigate to="/register" />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AdminProtected>
                <Dashboard />
              </AdminProtected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={
              <AdminProtected>
                <Register />
              </AdminProtected>
            }
          />
          <Route
            path="/addChild"
            element={
              <AdminProtected>
                <ChildrenForm route ={'/api/user/register/child/'}/>
              </AdminProtected>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
