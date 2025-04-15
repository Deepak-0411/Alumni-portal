import { useNavigate } from "react-router-dom";
import GBULOGO from "../../assets/GBULOGO.png";
import styles from "./Styles/header.module.css";

const Header = ({ buttons }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={() => navigate("/")}>
        <img className={styles.logoImg} src={GBULOGO} alt="LOGO" />
        <div className={`${styles.textContainer} ${buttons ? styles.hideContainer : ""}`}>
          <p className={styles.GBUHindi}>गौतम बुद्ध विश्वविद्यालय</p>
          <p className={styles.GBUEng}>GAUTAM BUDDHA UNIVERSITY</p>
          <p className={styles.GBUText}>
            An Ultimate Destination for Higher Learning
          </p>
        </div>
        <div className={styles.textDiv}>
          <p className={styles.text}>
            Alumni <br /> Association
          </p>
        </div>
      </div>
      {buttons && (
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
            login
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
