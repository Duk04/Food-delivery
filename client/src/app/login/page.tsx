"use client";
import { LoginEmail, LoginPic } from "./components";
export const LogIn = () => {
  return (
    <div className="grid grid-cols-2 items-center justify-center">
      <LoginEmail />
      <LoginPic />
    </div>
  );
};
export default LogIn;
