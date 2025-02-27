import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import Register from "../pages/auth/Register";

const MainRouting = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<Index />} />
      </Routes>
    </>
  );
};

export default MainRouting;
