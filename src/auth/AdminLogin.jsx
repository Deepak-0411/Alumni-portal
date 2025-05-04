import Header from "../components/Header";
import styles from "../styles/modules/Layout.module.css";
import Login from "./Login";

const AdminLogin = () => {
  return (
    <div className={styles.container}>
      <Header buttons={false} />
      <div className={styles.outlet}>
        <Login foradmin={true} />
      </div>
    </div>
  );
};
export default AdminLogin;
