import Logo from "../../assets/logo.webp";
import styles from "./LogoLoading.module.css";

const LogoLoading = () => {
  return (
    <div className={styles.loaderContainer}>
      <img className={styles.logo} src={Logo} alt="logo" />
    </div>
  );
};
export default LogoLoading;
