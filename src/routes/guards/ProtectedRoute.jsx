import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../assets/logo.webp";
import styles from "../../styles/modules/others/ProtectedRoute.module.css";
import { toast } from "react-toastify";
import apiRequest from "../../utility/apiRequest";

const ProtectedRoute = ({ element, user }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  let defaultRoot = "";
  let url = "";

  if (user === "user") {
    defaultRoot = "/alumni/home";
    url = "/api/members-only/alumni-auth";
  } else if (user === "sub-Admin") {
    defaultRoot = "/alumni/sub-admin/login";
    url = "/api/members-only/admin-auth";
  } else if (user === "super-Admin") {
    defaultRoot = "/alumni/superAdmin/login";
    url = "/api/members-only/admin-auth";
  }

  useEffect(() => {
    const checkAuth = async () => {
      const response = await apiRequest({
        url: url,
        method: "GET",
      });

      if (response.status === "success") {
        setIsAuthorized(true);
      } else {
        console.error("Error:", response.message);
        toast.error(`Failed to verify`);
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  // if (!authToken) {
  //   return <Navigate to={`${defaultRoot}`} />;
  // }

  // Handle loading state
  if (isAuthorized === null) {
    return (
      <div className={styles.loaderContainer}>
        <img className={styles.logo} src={Logo} alt="logo" />
      </div>
    );
  }

  // Redirect unauthorized users immediately
  return isAuthorized ? element : <Navigate to={`${defaultRoot}`} replace />;
};

export default ProtectedRoute;
