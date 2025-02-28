import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import ClientRouting from "./ClientRouting";
import AdminRouting from "./AdminRouting";
import { useSelector } from "react-redux";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";

const MainRouting = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={user.role === "admin" ? <AdminRouting /> : <ClientRouting />}
        />
      </Routes>
    </>
  );
};

export default MainRouting;
