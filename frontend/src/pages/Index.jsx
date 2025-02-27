import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Login from "./auth/Login";
import Home from "./clientPage/Home";

const Index = () => {
  const user = useSelector((state) => state.user);
  console.log("index: ", user);
  const [isToken, setIsToken] = useState(false);

  const checkUserLoggedIn = async () => {
    const token = await localStorage.getItem("token");
    if (token) {
      setIsToken(true);
      console.log("Token:", token);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, [user]);

  return <>{isToken ? <Home /> : <Login />}</>;
};

export default Index;
