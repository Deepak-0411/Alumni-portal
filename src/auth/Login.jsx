import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../assets/GBULOGO.png";
import Input from "../components/Input";
import styles from "../styles/modules/Login.module.css";

const Login = ({ foradmin = false }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);  

  const navigate = useNavigate();

  const handleLogin = () => {
    foradmin
      ? navigate("/alumni/sub-admin/verify-Users")
      : navigate("/alumni/user/membershipCard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.logo} src={LOGO} alt="logo" />
        <h2 className={styles.title}>Alumni Login</h2>
      </div>
      <form className={styles.form}>
        <Input
          type={"text"}
          name={"username"}
          label={"Username"}
          required={true}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type={"password"}
          name={"password"}
          label={"Password"}
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <input
            type="checkbox"
            id="check"
            className={styles.checkBox}
            value={remember}
            onClick={(prev) => setRemember(!prev)}
          />
          <label className={styles.checkLabel} htmlFor="check">
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className={`${styles.btn} ${styles.loginBtn}`}
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
      {!foradmin && (
        <div className={styles.btns}>
          <button
            className={styles.btn}
            onClick={() => navigate("/alumni/forgetPassword")}
          >
            Forget Password
          </button>
          <button
            className={styles.btn}
            onClick={() => navigate("/alumni/register")}
          >
            New Registration
          </button>
          <button
            className={`${styles.btn} ${styles.fullLengthBtn}`}
            onClick={() => navigate("/alumni/checkStatus")}
          >
            Check Status
          </button>
        </div>
      )}
    </div>
  );
};
export default Login;
