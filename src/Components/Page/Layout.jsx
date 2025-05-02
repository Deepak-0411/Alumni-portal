import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./Styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "../../User/Pages/navbar";

const Layout = () => {
  const location = useLocation();
  const showBtns= location.pathname==="/alumni" || location.pathname==="/alumni/home" ;
  const showNavbar= location.pathname.includes("user");

  if (location.pathname === "/alumni/user" || location.pathname === "/alumni/user/") {
    return <Navigate to="/alumni/user/events" replace />;
  }

  return (
    <div className={styles.container} >
      <Header buttons={showBtns} />
      {showNavbar? <Navbar/>: null}
      <div className={styles.outlet} style={showBtns ? { padding: "0rem" } : {}}>
      <Outlet />
      </div>

      <Footer />
    </div>
  );
};
export default Layout;
