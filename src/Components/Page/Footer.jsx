import styles from "./Styles/footer.module.css";
import logo from "../../assets/logo.png";
import SocialLinks from "../SocialLinks";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <div className={styles.logoBox}>
          <img className={styles.logo} src={logo} alt="Logo" />
        </div>
        <SocialLinks className={styles.linkBox1} />
      </div>

      <div className={styles.address}>
        <p className={styles.addressText}>
          Gautam Buddha University (GBU) Greater Noida (U.P.) is a university
          established by the Uttar Pradesh Gautam Buddha University Act 2002 (UP
          Act No. 9 of 2002) and came into existence in 2008.
        </p>
      </div>

      <SocialLinks className={styles.linkBox2} />

      <div className={styles.copyRight}>
        <p className={styles.copyRightText}>
          <span>&copy;</span> 2025 - Gautam Buddha University.
        </p>
      </div>
    </div>
  );
};

export default Footer;
