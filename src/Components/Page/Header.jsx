import GBULOGO from "../../assets/GBULOGO.png";
import styles from "./Styles/header.module.css";

const Header = ({ buttons }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src={GBULOGO} alt="LOGO" />
        <div className={styles.textDiv}>
          <p className={styles.text}>
            Alumni <br /> Association
          </p>
        </div>
      </div>
      {buttons && (
        <div className={styles.btns}>
          <button className={`${styles.registerBtn} ${styles.btn}`}>
            Register
          </button>
          <button className={`${styles.loginBtn} ${styles.btn}`}>login</button>
        </div>
      )}
    </div>
  );
};
export default Header;
