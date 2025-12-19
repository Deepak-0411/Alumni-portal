import { Navigate, Route } from "react-router-dom";
import ProtectedRoute from "./guards/ProtectedRoute";
import { lazy, Suspense } from "react";
import LogoLoading from "../components/Spinner/LogoLoading";
const AdminLayout = lazy(() => import("../layouts/AdminLayout"));
const VerifyUsersList = lazy(() => import("../pages/subAdmin/UsersList"));

const SubAdminRoutes = () => {
  return (
    <Route
      path="/alumni/sub-admin/"
      element={
        <Suspense fallback={<LogoLoading />}>
          <ProtectedRoute
            element={<AdminLayout role={"subAdmin"} />}
            user={"sub-Admin"}
          />
        </Suspense>
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
  );
};
export default SubAdminRoutes;
