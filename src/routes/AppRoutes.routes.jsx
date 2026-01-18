import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import LogoLoading from "../components/Spinner/LogoLoading";

import PageNotFound from "../pages/public/PageNotFound";

import PublicRoutes from "./PublicRoutes.routes";
import UserRoutes from "./UserRoutes.routes";
import SubAdminRoutes from "./SubAdminRoutes.routes";
import AdminRoutes from "./AdminRoutes.routes";

const AppRoutes = () => {
  return (
    <Suspense fallback={<LogoLoading />}>
      <Routes>
        {PublicRoutes()}
        {UserRoutes()}
        {SubAdminRoutes()}
        {AdminRoutes()}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
