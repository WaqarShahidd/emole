import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import ForgotPassword from "./../Pages/Auth/ForgotPassword";
import ResetPassword from "./../Pages/Auth/ResetPassword";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Products from "../Pages/Products/Products";
import Segments from "../Pages/Segments/Segments";
import Notifications from "../Pages/Notifications/Notifications";
import Account from "../Pages/Account/Account";
import Terms from "../Pages/Account/Terms";
import GroupModal from "../components/GroupModal";
import WebsitesModal from "../components/WebsitesModal";

export default function Router() {
  return (
    <BrowserRouter>
      <GroupModal />
      <WebsitesModal />
      <Routes>
        {/* auth router  */}
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />

        {/* Main */}
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/segments" element={<Segments />} />
        <Route exact path="/notifications" element={<Notifications />} />
        <Route exact path="/account" element={<Account />} />

        {/* Extra */}
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}
