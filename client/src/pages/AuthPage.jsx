import React from "react";
import { useLocation } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
      {isLogin ? <Login /> : <Register />}
    </main>
  );
};

export default AuthPage;
