import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createQuery } from "../../lib/createQuery";
import LogoLoading from "../../components/Spinner/LogoLoading";

const ProtectedRoute = ({ children, user }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  const config = {
    user: {
      defaultRoot: "/alumni/login",
      url: "/api/members-only/alumni-auth",
      storageKey: "user",
    },
    "sub-Admin": {
      defaultRoot: "/alumni/sub-admin/login",
      url: "/api/members-only/subadmin-auth",
      storageKey: "subAdmin",
    },
    "super-Admin": {
      defaultRoot: "/alumni/superAdmin/login",
      url: "/api/members-only/admin-auth",
      storageKey: "superAdmin",
    },
  };

  const { defaultRoot, url, storageKey } = config[user];

  const stored = localStorage.getItem(storageKey);
  const isLoggedBefore = stored === "true";

  useEffect(() => {
    if (!isLoggedBefore) setIsAuthorized(false);
  }, [isLoggedBefore]);

  const { error, isSuccess, isError } = createQuery(storageKey, url, {
    enabled: isLoggedBefore === true,
    staleTime: 0,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsAuthorized(true);
    }
    if (isError) {
      console.error("Auth error:", error?.message);
      setIsAuthorized(false);
      toast.info("Session expired. Login again!");
    }
  }, [isSuccess, isError]);

  // Loader
  if (isAuthorized === null) {
    return <LogoLoading />;
  }

  return isAuthorized ? children : <Navigate to={defaultRoot} replace />;
};

export default ProtectedRoute;
