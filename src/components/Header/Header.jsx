import { Link } from "react-router-dom";
import GBULOGO from "../../assets/GBULOGO.webp";
import styles from "./Header.module.css";

const Header = ({ showButtons, additionalComponent, isAdmin = false }) => {
  const applyAdminStyle = (baseClass) =>
    `${baseClass} ${isAdmin ? styles.adminHeaderAll : ""}`;

  return (
    <header
      className={`${styles.header} ${isAdmin ? styles.adminHeaderHeader : ""}`}
    >
      <Link className={styles.logo} to="/alumni">
        <img
          className={styles.logoImg}
          src={GBULOGO}
          alt="LOGO"
          draggable="false"
        />

        <div
          className={`${styles.textContainer} ${
            showButtons ? styles.hideContainer : ""
          }`}
        >
          <p className={applyAdminStyle(styles.GBUHindi)}>
            गौतम बुद्ध विश्वविद्यालय
          </p>
          <p className={applyAdminStyle(styles.GBUEng)}>
            GAUTAM BUDDHA UNIVERSITY
          </p>
          <p className={applyAdminStyle(styles.GBUText)}>
            An Ultimate Destination for Higher Learning
          </p>
        </div>

        <div className={styles.textDiv}>
          <p
            className={`${styles.text} ${
              isAdmin ? styles.adminHeaderChota : ""
            }`}
          >
            Alumni <br /> Association
          </p>
        </div>
      </Link>

      {showButtons && (
        <div className={styles.btns}>
          <Link
            className={`${styles.registerBtn} ${styles.btn}`}
            to="/alumni/register"
          >
            Register
          </Link>
          <Link
            className={`${styles.loginBtn} ${styles.btn}`}
            to="/alumni/user"
          >
            Login
          </Link>
        </div>
      )}

      {additionalComponent && (
        <div className={styles.userInfoWrapper}>{additionalComponent}</div>
      )}
    </header>
  );
};

export default Header;
