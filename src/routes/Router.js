import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "./../Pages/Auth/ForgotPassword";
import ResetPassword from "./../Pages/Auth/ResetPassword";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth router  */}
        <Route exact path="/" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
