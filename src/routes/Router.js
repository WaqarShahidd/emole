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
import GroupModal from "../Pages/Modals/GroupModal";
import WebsitesModal from "../Pages/Modals/WebsitesModal";
import { WebsiteDetailModal } from "../Pages/Modals/WebsiteDetailModal";
import AccountBilling from "../Pages/Modals/AccountBilling";
import BillingPlans from "../Pages/Modals/BillingPlans";
import PrivateRoute from "./PrivateRoute";
import TermsPolicy from "../Pages/Modals/TermsPolicy";
import SupportTutorialModal from "../Pages/Modals/SupportTutorialModal";
import TutorialModal from "../Pages/Modals/TutorialModal";
import ViewProducts from "../Pages/Products/ViewProducts";
import ViewProductsWebsite from "../Pages/Products/ViewProductsWebsite";
import EditProfile from "../Pages/Modals/EditProfile";
import ResetPasswordModal from "../Pages/Modals/ResetPassword";
import { Alert, Snackbar } from "@mui/material";
import { useUser } from "../constants/context";

export default function Router() {
  const { paymentSuccessful, setpaymentSuccessful } = useUser();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setpaymentSuccessful(false);
  };

  return (
    <BrowserRouter>
      <GroupModal />
      <WebsitesModal />
      <WebsiteDetailModal />
      <AccountBilling />
      <BillingPlans />
      <TermsPolicy />
      <SupportTutorialModal />
      <TutorialModal />
      <EditProfile />
      <ResetPasswordModal />

      <Snackbar
        open={paymentSuccessful}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Payment Successful.
        </Alert>
      </Snackbar>

      <Routes>
        {/* auth router  */}
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />

        {/* Main */}
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/group/view-products" element={<ViewProducts />} />
          <Route
            exact
            path="/website/view-products"
            element={<ViewProductsWebsite />}
          />
          <Route exact path="/segments" element={<Segments />} />
          <Route exact path="/notifications" element={<Notifications />} />
          <Route exact path="/account" element={<Account />} />
        </Route>

        {/* Extra */}
        <Route path="*" element={<h1>Not Found</h1>} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}
