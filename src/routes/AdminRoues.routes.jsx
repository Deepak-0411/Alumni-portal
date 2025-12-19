import { lazy, Suspense } from "react";
import { Navigate, Route } from "react-router-dom";
import ProtectedRoute from "./guards/ProtectedRoute";
import LogoLoading from "../components/Spinner/LogoLoading";

const AdminBundle = lazy(() => import("./bundles/admin.bundle"));

const AdminRoues = () => {
  return (
    <Route
      path="/alumni/superAdmin"
      element={
        <Suspense fallback={<LogoLoading />}>
          <ProtectedRoute
            element={<AdminBundle.AdminLayout role="superAdmin" />}
            user="super-Admin"
          />
        </Suspense>
      }
    >
      <Route index element={<Navigate to="alumni" />} />
      <Route path="alumni" element={<AdminBundle.Alumni />} />
      <Route path="events" element={<AdminBundle.CreateEvents />} />
      <Route path="finance" element={<AdminBundle.Finance />} />
      <Route path="subAdmin" element={<AdminBundle.SubAdmin />} />
    </Route>
  );
};

export default AdminRoues;
