import { lazy, Suspense } from "react";
import { Navigate, Route } from "react-router-dom";
import ProtectedRoute from "./guards/ProtectedRoute";
import LogoLoading from "../components/Spinner/LogoLoading";
// pages
import Alumni from "../pages/admin/Alumni";
import CreateEvents from "../pages/admin/CreateEvents";
import Finance from "../pages/admin/Finance";
import SubAdmin from "../pages/admin/SubAdmin";

const AdminLayout = lazy(() => import("../layouts/AdminLayout"));

const AdminRoutes = () => {
  return (
    <Route
      path="/alumni/superAdmin"
      element={
        <Suspense fallback={<LogoLoading />}>
          <ProtectedRoute user="super-Admin">
            <AdminLayout role="superAdmin" />
          </ProtectedRoute>
        </Suspense>
      }
    >
      <Route index element={<Navigate to="alumni" />} />
      <Route path="alumni" element={<Alumni />} />
      <Route path="events" element={<CreateEvents />} />
      <Route path="finance" element={<Finance />} />
      <Route path="subAdmin" element={<SubAdmin />} />
    </Route>
  );
};

export default AdminRoutes;
