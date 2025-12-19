import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import LogoLoading from "../components/Spinner/LogoLoading";

// Public Pages
const UserLayout = lazy(() => import("../layouts/UserLayout"));
import Home from "../pages/public/Home";
import PageNotFound from "../pages/public/PageNotFound";
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

// User Pages
import UserRoutes from "./UserRoutes.routes";

//Sub Admin Pages
import SubAdminRoutes from "./SubAdminRoutes.routes";

// Admin Pages
import AdminRoues from "./AdminRoues.routes";

const AppRoutes = () => {
  return (
    <Suspense fallback={<LogoLoading />}>
      <Routes>
        <Route path="devTeam" element={<Devs />} />
        <Route path="/" element={<Navigate to="/alumni" />} />
        {/* Public Layout */}
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
        {/* User Routes (Protected) */}
        {UserRoutes()}

        {/* Sub Admin Routes (Protected and Role-Restricted) */}
        <Route path="/alumni/sub-admin/login" element={<SubAdminLogin />} />
        {SubAdminRoutes()}
        {/* Admin Routes (Protected and Role-Restricted) */}
        <Route path="/alumni/superAdmin/login" element={<AdminLogin />} />
        {AdminRoues()}

        {/* Catch-all route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
