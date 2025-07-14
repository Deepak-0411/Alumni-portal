import { Outlet, useLocation } from "react-router-dom";
import styles from "../styles/modules/layout/Layout.module.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const UserLayout = () => {
  const location = useLocation();

  // Show "header buttons" only on specific routes
  const showBtns = location.pathname === "/alumni" || location.pathname === "/alumni/home";

  // Show Navbar only on user-related pages
  const showNavbar = location.pathname.startsWith("/alumni/user");

  console.log(showBtns);
  

  return (
    <div className={styles.container}>
      <Header showButtons={showBtns} />
      {showNavbar && <Navbar />}
      <main
        className={styles.outlet}
        style={showBtns ? { padding: "0rem" } : {}}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
