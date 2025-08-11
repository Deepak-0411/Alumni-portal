import { Outlet, useLocation } from "react-router-dom";
import styles from "../styles/modules/layout/Layout.module.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import UserInfo from "../components/UserInfo";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = ({ role }) => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <Header
        buttons={false}
        additionalComponent={<UserInfo role={role} />}
        isAdmin={true}
      />
      <main className={styles.outlet2}>
        <AdminNavbar forPage={role} />
        <Outlet />
      </main>
      <Footer onlyDevTeamFooter={true} />
    </div>
  );
};

export default AdminLayout;
