import React from "react";
import { Route, Routes } from "react-router-dom";
import ClientDashboard from "../pages/client/ClientDashboard";
import ClientProfile from "../pages/client/ClientProfile";

const ClientRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientDashboard />} />
      <Route path="/profile" element={<ClientProfile />} />
    </Routes>
  );
};

export default ClientRouting;
