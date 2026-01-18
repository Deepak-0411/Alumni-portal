import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
// pages
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/public/Home";
const Devs = lazy(() => import("../pages/public/Devs"));
const ContactUs = lazy(() => import("../pages/public/ContactUs"));
const CheckStatus = lazy(() => import("../pages/public/CheckStatus"));
const ForgetPassword = lazy(() => import("../pages/public/ForgetPassword"));
const ChangePass = lazy(() =>
  import("../components/ChangePassword/ChangePass")
);

// Auth Pages
import Login from "../auth/Login";
import SubAdminLogin from "../auth/SubAdminLogin";
import AdminLogin from "../auth/AdminLogin";
import Register from "../auth/Register";

const PublicRoutes = () => {
  return (
    <>
      <Route path="devTeam" element={<Devs />} />
      <Route path="/" element={<Navigate to="/alumni" />} />
      <Route path="/alumni" element={<UserLayout />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgetPassword" element={<ForgetPassword />} />
        <Route
          path="/alumni/forgetPassword/reset/:token"
          element={<ChangePass isForgotMode={true} />}
        />
        <Route path="payment-success" element={<h1>payment success</h1>} />
        <Route path="payment-failure" element={<h1>payment Failed</h1>} />
        <Route path="checkStatus" element={<CheckStatus />} />
      </Route>
      {/* admin logins */}
      <Route path="/alumni/sub-admin/login" element={<SubAdminLogin />} />
      <Route path="/alumni/superAdmin/login" element={<AdminLogin />} />
    </>
  );
};
export default PublicRoutes;
