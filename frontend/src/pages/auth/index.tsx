import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return isLogin ? <Login toggle={() => setIsLogin(false)} /> : <Register toggle={() => setIsLogin(true)} />;
};

export default Auth;
