import { Outlet, useLocation } from "react-router-dom";
import styles from "../styles/modules/layout/Layout.module.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
  const location = useLocation();

  // Show Navbar only on user-related pages
  const showNavbar = location.pathname.startsWith("/alumni/super-admin/");

  return (
    <div className={styles.container}>
      <Header buttons={false} />
      {showNavbar && <Navbar />}
      <div className={styles.outlet2}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
