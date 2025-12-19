import { lazy, Suspense } from "react";
import { Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./guards/ProtectedRoute";
import LogoLoading from "../components/Spinner/LogoLoading";

const UserBundle = lazy(() => import("./bundles/user.bundle"));

const UserRoutes = () => {
  return (
    <Route
      path="/alumni/user"
      element={
        <Suspense fallback={<LogoLoading />}>
          <ProtectedRoute element={<UserBundle.UserLayout />} user={"user"} />
        </Suspense>
      }
    >
      <Route index element={<Navigate to="membershipCard" />} />
      <Route path="events" element={<UserBundle.Events />} />
      <Route path="membershipCard" element={<UserBundle.MembershipCard />} />
      <Route path="profile" element={<UserBundle.Profile />} />
      <Route path="contactUs" element={<UserBundle.ContactUs />} />
      <Route path="changePassword" element={<UserBundle.ChangePass />} />
    </Route>
  );
};

export default UserRoutes;
