import { useNavigate } from "react-router-dom";
import GBULOGO from "../../assets/GBULOGO.png";
import styles from "./Header.module.css";

const Header = ({ showButtons, additionalComponent, isAdmin = false }) => {
  const navigate = useNavigate();

  const applyAdminStyle = (baseClass) =>
    `${baseClass} ${isAdmin ? styles.adminHeaderAll : ""}`;

  return (
    <header className={`${styles.header} ${isAdmin ? styles.adminHeaderHeader : ""}`}>
      <div className={styles.logo} onClick={() => navigate("/alumni")}>
        <img className={styles.logoImg} src={GBULOGO} alt="LOGO" />

        <div className={`${styles.textContainer} ${showButtons ? styles.hideContainer : ""}`}>
          <p className={applyAdminStyle(styles.GBUHindi)}>गौतम बुद्ध विश्वविद्यालय</p>
          <p className={applyAdminStyle(styles.GBUEng)}>GAUTAM BUDDHA UNIVERSITY</p>
          <p className={applyAdminStyle(styles.GBUText)}>An Ultimate Destination for Higher Learning</p>
        </div>

        <div className={styles.textDiv}>
          <p className={`${styles.text} ${isAdmin ? styles.adminHeaderChota : ""}`}>
            Alumni <br /> Association
          </p>
        </div>
      </div>

      {showButtons && (
        <div className={styles.btns}>
          <button
            className={`${styles.registerBtn} ${styles.btn}`}
            onClick={() => navigate("/alumni/register")}
          >
            Register
          </button>
          <button
            className={`${styles.loginBtn} ${styles.btn}`}
            onClick={() => navigate("/alumni/login")}
          >
            Login
          </button>
        </div>
      )}

      {additionalComponent && (
        <div className={styles.userInfoWrapper}>{additionalComponent}</div>
      )}
    </header>
  );
};

export default Header;
