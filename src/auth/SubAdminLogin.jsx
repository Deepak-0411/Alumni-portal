import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "../styles/modules/layout/Layout.module.css";
import Login from "./Login";

const SubAdminLogin = () => {
  return (
    <div className={styles.container}>
      <Header buttons={false} />
      <div className={styles.outlet}>
        <Login user={"subAdmin"} />
      </div>
      <Footer onlyDevTeamFooter={true} />
    </div>
  );
};
export default SubAdminLogin;
