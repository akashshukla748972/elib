import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../pages/Index";
import ClientRouting from "./ClientRouting";
import AdminRouting from "./AdminRouting";
import { useSelector } from "react-redux";

const MainRouting = () => {
  const user = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path="/*"
        element={user.role === "admin" ? <AdminRouting /> : <ClientRouting />}
      />
    </Routes>
  );
};

export default MainRouting;
