import { Outlet } from "react-router-dom";
import styles from "./Styles/Layout.module.css";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className={styles.container}>
      <Header buttons={true} />
      <div className={styles.outlet}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
export default Layout;
