import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

// Public Pages
import Home from "../pages/public/Home";
import ContactUs from "../pages/public/ContactUs";
import CheckStatus from "../pages/public/CheckStatus";
import ForgetPassword from "../pages/public/ForgetPassword";
import ChangePass from "../components/ChangePassword/ChangePass";
import Devs from "../pages/public/Devs";
import PageNotFound from "../pages/public/PageNotFound";

// Auth Pages
import Login from "../auth/Login";
import Register from "../auth/Register";

// User Pages
import Profile from "../pages/user/Profile";
import Events from "../pages/user/Events";
import MembershipCard from "../pages/user/MembershipCard";

//Sub Admin Pages
import SubAdminLogin from "../auth/SubAdminLogin";
import VerifyUsersList from "../pages/subAdmin/UsersList";

// Admin Pages
import AdminLogin from "../auth/AdminLogin";
import Alumni from "../pages/admin/Alumni";
import Finance from "../pages/admin/Finance";
import SubAdmin from "../pages/admin/SubAdmin";
import CreateEvents from "../pages/admin/CreateEvents";

// Route Guards
import ProtectedRoute from "./guards/ProtectedRoute";
import { useEffect } from "react";
import { setGlobalNavigate } from "../utility/redirectTOLogin";

const AppRoutes = () => {

  return (
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
      <Route
        path="/alumni/user"
        element={<ProtectedRoute element={<UserLayout />} user={"user"} />}
      >
        <Route index element={<Navigate to="membershipCard" />} />
        <Route path="profile" element={<Profile />} />
        <Route path="events" element={<Events />} />
        <Route path="membershipCard" element={<MembershipCard />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="changePassword" element={<ChangePass />} />
      </Route>

      {/* Sub Admin Routes (Protected and Role-Restricted) */}
      <Route path="/alumni/sub-admin/login" element={<SubAdminLogin />} />
      <Route
        path="/alumni/sub-admin/"
        element={
          <ProtectedRoute
            element={<AdminLayout role={"subAdmin"} />}
            user={"sub-Admin"}
          />
        }
      >
        <Route index element={<Navigate to="verify-users" />} />
        <Route
          path="verify-users"
          element={<VerifyUsersList key="verify" role={"verify"} />}
        />
        <Route
          path="active-users"
          element={<VerifyUsersList key="active" role={"active"} />}
        />
        <Route
          path="approved-users"
          element={<VerifyUsersList key="approved" role={"approved"} />}
        />
      </Route>

      {/* Admin Routes (Protected and Role-Restricted) */}
      <Route path="/alumni/superAdmin/login" element={<AdminLogin />} />
      <Route
        path="/alumni/superAdmin/"
        element={
          // <AdminLayout role={"admin"} /> // for testing
          <ProtectedRoute
            element={<AdminLayout role={"superAdmin"} />}
            user={"super-Admin"}
          />
        }
      >
        <Route index element={<Navigate to="alumni" />} />
        <Route path="alumni" element={<Alumni />} />
        <Route path="events" element={<CreateEvents />} />
        <Route path="finance" element={<Finance />} />
        <Route path="subAdmin" element={<SubAdmin />} />
      </Route>
      {/* <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="manage-users" element={<ManageUsers />} />
      </Route> */}

      {/* Catch-all route */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
