import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import PageNotFound from "../pages/PageNotFound";

// Public Pages
import Home from "../pages/public/Home";
import ContactUs from "../pages/public/ContactUs";
import CheckStatus from "../pages/public/CheckStatus";

// Auth Pages
import Login from "../auth/Login";
import Register from "../auth/Register";

// User Pages
import Profile from "../pages/user/Profile";
import Events from "../pages/user/Events";
import MembershipCard from "../pages/user/MembershipCard";

//Sub Admin Pages
import SubAdminLogin from "../auth/SubAdminLogin";
import VerifyUsersList from "../pages/subAdmin/VerifyUsersList";

// Admin Pages
import AdminLogin from "../auth/AdminLogin";
import Alumni from "../pages/admin/Alumni";
import Finance from "../pages/admin/Finance";
import School from "../pages/admin/School";
import SubAdmin from "../pages/admin/SubAdmin";
import CreateEvents from "../pages/admin/CreateEvents";

// Route Guards
// import RequireAuth from "./guards/RequireAuth";
// import RequireAdmin from "./guards/RequireAdmin";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/alumni" />} />
      {/* Public Layout */}
      <Route path="/alumni" element={<UserLayout />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<Home />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="login" element={<Login />} />
        <Route
          path="forgetPassword"
          element={<h1>Comming Soon</h1>}
        />
        <Route path="register" element={<Register />} />
        <Route path="checkStatus" element={<CheckStatus />} />
      </Route>

      {/* User Routes (Protected) */}
      <Route path="/alumni/user" element={<UserLayout />}>
        {/*  <RequireAuth>   </RequireAuth> */}
        <Route index element={<Navigate to="membershipCard" />} />
        <Route path="profile" element={<Profile />} />
        <Route path="events" element={<Events />} />
        <Route path="membershipCard" element={<MembershipCard />} />
        <Route path="contactUs" element={<ContactUs />} />
      </Route>

      {/* Sub Admin Routes (Protected and Role-Restricted) */}
      <Route path="/alumni/sub-admin/login" element={<SubAdminLogin />} />
      <Route
        path="/alumni/sub-admin/"
        element={<AdminLayout role={"subAdmin"} />}
      >
        <Route index element={<Navigate to="verify-users" />} />
        <Route path="verify-users" element={<VerifyUsersList />} />
        <Route
          path="active-users"
          element={<VerifyUsersList isForActiveUsers={true} />}
        />
      </Route>

      {/* Admin Routes (Protected and Role-Restricted) */}
      <Route path="/alumni/superAdmin/login" element={<AdminLogin />} />
      <Route
        path="/alumni/superAdmin/"
        element={<AdminLayout role={"admin"} />}
      >
        <Route index element={<Navigate to="alumni" />} />
        <Route path="alumni" element={<Alumni />} />
        <Route path="events" element={<CreateEvents />} />
        <Route path="finance" element={<Finance />} />
        <Route path="school" element={<School />} />
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
