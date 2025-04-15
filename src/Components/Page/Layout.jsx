import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styles from "./Styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const showBtn= location.pathname==="/alumni" || location.pathname==="/alumni/home";
  return (
    <div className={styles.container} >
      <Header buttons={showBtn} />
      {/* <div className={styles.outlet} style={showBtn ? { padding: "0rem" } : {}}>
      <Outlet />
      </div>

      <Footer /> */}
    </div>
  );
};
export default Layout;
