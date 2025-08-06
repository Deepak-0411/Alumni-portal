import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "../styles/modules/layout/Layout.module.css";
import Login from "./Login";

const AdminLogin = () => {
  return (
    <div className={styles.container}>
      <Header buttons={false} />
      <div className={styles.outlet}>
        <Login user={"superAdmin"} />
      </div>
      <Footer onlyDevTeamFooter={true} />
    </div>
  );
};
export default AdminLogin;
