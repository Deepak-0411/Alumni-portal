import { Outlet, useLocation } from "react-router-dom";
import styles from "../styles/modules/Layout.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = () => {
  const location = useLocation();

  // Show "header buttons" only on specific routes
  const showBtns = location.pathname === "/alumni" || location.pathname === "/alumni/home";

  // Show Navbar only on user-related pages
  const showNavbar = location.pathname.startsWith("/alumni/user");

  return (
    <div className={styles.container}>
      <Header buttons={showBtns} />
      {showNavbar && <Navbar />}
      <div
        className={styles.outlet}
        style={showBtns ? { padding: "0rem" } : {}}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
