import Header from "../components/Header/Header";
import DevFooter from "../components/Footer/DevFooter"
import styles from "../styles/modules/layout/Layout.module.css";
import Login from "./Login";

const SubAdminLogin = () => {
  return (
    <div className={styles.container}>
      <Header buttons={false} />
      <div className={styles.outlet}>
        <Login user={"subAdmin"} />
      </div>
      <DevFooter/>
    </div>
  );
};
export default SubAdminLogin;
