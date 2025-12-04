import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../assets/logo.webp";
import styles from "../../styles/modules/others/ProtectedRoute.module.css";
import { toast } from "react-toastify";
import apiRequest from "../../apis/apiRequest";

const ProtectedRoute = ({ element, user }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [prevLoginState, setPrevLoginState] = useState(null);

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

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    setPrevLoginState(stored === "true");
  }, [storageKey]);

  useEffect(() => {
    if (prevLoginState === null) return;

    const checkAuth = async () => {
      if (prevLoginState === false) {
        setIsAuthorized(false);
        return;
      }

      const response = await apiRequest({
        url: url,
        method: "GET",
      });

      if (response.status === "success") {
        setIsAuthorized(true);
      } else {
        console.error("Error:", response.message);
        toast.info("Session expired. Login again!");
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, [prevLoginState]);

  // Loading screen
  if (isAuthorized === null) {
    return (
      <div className={styles.loaderContainer}>
        <img className={styles.logo} src={Logo} alt="logo" />
      </div>
    );
  }

  // Redirect unauthorized
  return isAuthorized ? element : <Navigate to={defaultRoot} replace />;
};

export default ProtectedRoute;
