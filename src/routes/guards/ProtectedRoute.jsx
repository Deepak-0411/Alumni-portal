import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../assets/logo.webp";
import styles from "../../styles/modules/others/ProtectedRoute.module.css";
import { toast } from "react-toastify";
import { createQuery } from "../../lib/createQuery";

const ProtectedRoute = ({ element, user }) => {
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
      toast.success("LoggedIn SuccessFully!");
    }
    if (isError) {
      console.error("Auth error:", error?.message);
      setIsAuthorized(false);
      toast.info("Session expired. Login again!");
    }
  }, [isSuccess, isError]);

  // Loader
  if (isAuthorized === null) {
    return (
      <div className={styles.loaderContainer}>
        <img className={styles.logo} src={Logo} alt="logo" />
      </div>
    );
  }

  return isAuthorized ? element : <Navigate to={defaultRoot} replace />;
};

export default ProtectedRoute;
