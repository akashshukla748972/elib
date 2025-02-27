import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/auth/Register";

const SubRouting = () => {
  return (
    <>
      <Routes>
        <Route path="register" element={<Register />} />
      </Routes>
    </>
  );
};

export default SubRouting;
