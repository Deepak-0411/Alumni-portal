import { lazy, Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./guards/ProtectedRoute";
import LogoLoading from "../components/Spinner/LogoLoading";
// pages
import Profile from "../pages/user/Profile";
import MembershipCard from "../pages/user/MembershipCard";
import Events from "../pages/user/Events";
import ContactUs from "../pages/public/ContactUs";
import ChangePass from "../components/ChangePassword/ChangePass";

const UserLayout = lazy(() => import("../layouts/UserLayout"));

const UserRoutes = () => {
  return (
    <Route
      path="/alumni/user"
      element={
        <Suspense fallback={<LogoLoading />}>
          <ProtectedRoute user={"user"}>
            <UserLayout />
          </ProtectedRoute>
        </Suspense>
      }
    >
      <Route index element={<Navigate to="membershipCard" />} />
      <Route path="events" element={<Events />} />
      <Route path="membershipCard" element={<MembershipCard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="contactUs" element={<ContactUs />} />
      <Route path="changePassword" element={<ChangePass />} />
    </Route>
  );
};

export default UserRoutes;
