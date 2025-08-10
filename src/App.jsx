import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NearbyHospitalsMap from "./components/NearbyHospitalsMap";

// Admin pages 
import AdminDashboard from "./pages/admin/AdminDashboard";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Redirect/Route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* user Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}