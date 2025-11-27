import styles from "./Footer.module.css";
import logo from "../../assets/logo.webp";
import SocialLinks from "../SocialLinks/SocialLinks";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleDevClick = () => {
    navigate("/devTeam");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <div className={styles.logoBox}>
          <img className={styles.logo} src={logo} alt="Logo" />
        </div>
        <SocialLinks location="up" />
      </div>

      <div className={styles.address}>
        <p className={styles.addressText}>
          Gautam Buddha University (GBU) Greater Noida (U.P.) is a university
          established by the Uttar Pradesh Gautam Buddha University Act 2002 (UP
          Act No. 9 of 2002) and came into existence in 2008.
        </p>
      </div>

      <SocialLinks location="low" />

      <div className={styles.copyRightDiv}>
        <p className={styles.copyRightText}>
          <span>&copy;</span> 2025 - Gautam Buddha University.
        </p>
      </div>

      <div className={styles.devTeamDiv}>
        <p className={styles.devTeam}>
          <button onClick={handleDevClick}>
            Designed & Developed By team
            <span className={styles.devName}>{" Ansh"}</span>,
            <span className={styles.devName}>{" Daksh"}</span>,
            <span className={styles.devName}>{" Deepak "}</span>&
            <span className={styles.devName}>{" Harsh"}</span>
          </button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
