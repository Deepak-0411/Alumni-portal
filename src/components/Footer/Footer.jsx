import styles from "./Footer.module.css";
import logo from "../../assets/logo.png";
import SocialLinks from "../SocialLinks/SocialLinks";

const Footer = ({ onlyDevTeamFooter = false }) => {
  const handleDevClick = () => {
    console.log("Name Clicked");
  };

  return (
    <footer className={styles.footer}>
      {!onlyDevTeamFooter && (
        <>
          <div className={styles.links}>
            <div className={styles.logoBox}>
              <img className={styles.logo} src={logo} alt="Logo" />
            </div>
            <SocialLinks location="up" />
          </div>

          <div className={styles.address}>
            <p className={styles.addressText}>
              Gautam Buddha University (GBU) Greater Noida (U.P.) is a
              university established by the Uttar Pradesh Gautam Buddha
              University Act 2002 (UP Act No. 9 of 2002) and came into existence
              in 2008.
            </p>
          </div>

          <SocialLinks location="low" />

          <div className={styles.copyRightDiv}>
            <p className={styles.copyRightText}>
              <span>&copy;</span> 2025 - Gautam Buddha University.
            </p>
          </div>
        </>
      )}

      <div
        className={styles.devTeamDiv}
        style={
          onlyDevTeamFooter ? { padding: ".8rem" } : { paddingBottom: "1rem" }
        }
      >
        <p className={styles.devTeam}>
          Designed & Developed By
          <span className={styles.devName} onClick={handleDevClick}>
            {" Ansh Gusain"}
          </span>
          ,
          <span className={styles.devName} onClick={handleDevClick}>
            {" Daksh Verma"}
          </span>
          ,
          <span className={styles.devName} onClick={handleDevClick}>
            {" Deepak Kumar "}
          </span>
          &
          <span className={styles.devName} onClick={handleDevClick}>
            {" Harsh Singh"}
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
