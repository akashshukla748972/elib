import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ClientDashboard from "../pages/clientPage/ClientDashboard";
import ClientProfile from "../pages/clientPage/ClientProfile";

const ClientRouting = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <Routes>
      <Route path="/" element={<ClientDashboard />} />
      <Route path="/profile" element={<ClientProfile />} />
    </Routes>
  );
};

export default ClientRouting;
