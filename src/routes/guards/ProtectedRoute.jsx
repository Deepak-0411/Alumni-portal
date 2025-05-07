import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useEffect, useState, useMemo } from "react";
import Logo from "../../../public/FAVICON.png";
import styles from "../../styles/modules/ProtectedRoute.module.css";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element, user }) => {
  const { token } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(null);
  let defaultRoot = "";
  let url = "";

  if (user === "user") {
    defaultRoot = "/alumni/home";
    url = "";
  } else if (user === "subadmin") {
    defaultRoot = "alumni/sub-admin/login";
    url = "";
  } else if (user === "admin") {
    defaultRoot = "alumni/sub-admin/login";
    url = "";
  }
  
  const authToken = useMemo(() => token, [token]);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await apiRequest({
        url: url,
        method: "GET",
        token: token,
      });

      if (response.status === "success") {
        setIsAuthorized(true);
      } else {
        console.error("Error:", response.message);
        toast.error(`Error: ${response.message}`);
      }
    };

    checkAuth();
  }, [authToken]);

  if (!authToken) {
    return <Navigate to={`${defaultRoot}`} />;
  }

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
