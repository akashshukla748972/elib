import React, { useEffect } from "react";
import AdminDashboard from "../pages/adminPage/AdminDashboard";
import AdminProfile from "../pages/adminPage/AdminProfile";
import { Route, Routes, useNavigate } from "react-router-dom";

const AdminRouting = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/profile" element={<AdminProfile />} />
      </Routes>
    </>
  );
};

export default AdminRouting;
