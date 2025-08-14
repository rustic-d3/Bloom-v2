import React from "react";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFound from "./components/NotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtected from "./components/AdminProtected";
import api from "./api";
import ChildrenForm from "./components/ChildrenForm";
import ClassRoomForm from "./components/ClassRoomForm";
import LoginPage from "./pages/LoginPage";
import AddChildPage from "./pages/AddChildPage";
import RegisterPage from "./pages/RegisterPage";
import TeacherDashboard from "./pages/TeacherDashboard";
import ParenDashboard from "./pages/ParentDashboard"
import AllClassroomsPage from "./pages/AllClassroomsPage";
import SetAvailabilityPage from "./pages/SetAvailabilityPage";

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
                <AdminDashboardPage />
              </AdminProtected>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/register"
            element={
              <AdminProtected>
                <RegisterPage />
              </AdminProtected>
            }
          />
          <Route
            path="/addChild"
            element={
              <AdminProtected>
                <AddChildPage />
              </AdminProtected>
            }
          />
          <Route
            path="/allClassrooms"
            element={
              <AdminProtected>
                <AllClassroomsPage />
              </AdminProtected>
            }
          />
          <Route
            path="/createClassroom"
            element={
              <AdminProtected>
                <ClassRoomForm route={"api/create/classrooms/"} />
              </AdminProtected>
            }
          />
          <Route
            path="/teacherDashboard"
            element={
              <ProtectedRoute>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/parentDashboard"
            element={
              <ProtectedRoute>
                <ParenDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/availability"
            element={
              <ProtectedRoute>
                <SetAvailabilityPage />
              </ProtectedRoute>
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
