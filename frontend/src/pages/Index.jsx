import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Home from "./module/Home";
import Login from "./auth/Login";

const Index = () => {
  const user = useSelector((state) => state.user);
  const [isToken, setIsToken] = useState(false);
  const checkUserLogedIn = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      setIsToken(true);
    }
  };
  useEffect(() => {
    checkUserLogedIn();
  }, []);
  return <>{isToken ? <Home /> : <Login />}</>;
};

export default Index;
