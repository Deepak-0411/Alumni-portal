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
import AdminLogin from "../auth/AdminLogin";
import VerifyUsersList from "../pages/subAdmin/VerifyUsersList";
import VerifyUser from "../pages/subAdmin/VerifyUser";

// Admin Pages
// import Dashboard from "../pages/admin/Dashboard";
// import ManageUsers from "../pages/admin/ManageUsers";

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
          element={<CheckStatus forgetPassword={true} />}
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
      <Route path="/alumni/sub-admin/login" element={<AdminLogin />}/>
      <Route path="/alumni/sub-admin/" element={<AdminLayout />}>
        <Route index element={<Navigate to="verify-users-list" />} />
        <Route path="verify-users-list" element={<VerifyUsersList />} />
        <Route path="verify-user" element={<VerifyUser />} />
      </Route>

      {/* Admin Routes (Protected and Role-Restricted) */}
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
