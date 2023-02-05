import React, { useReducer } from "react";

import Login from "./login";
import Register from "./register";

interface LoginAndRegisterCardProps {
  onClose: () => void;
}

function LoginAndRegisterCard({ onClose }: LoginAndRegisterCardProps) {
  const [isLogin, handleToggle] = useReducer((prev) => !prev, true);

  return isLogin ? (
    <Login onClose={onClose} onToggle={handleToggle} />
  ) : (
    <Register onClose={onClose} onToggle={handleToggle} />
  );
}

export default LoginAndRegisterCard;
