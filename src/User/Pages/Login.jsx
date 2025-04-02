import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../Components/Input/Input";
import LOGO from "../../assets/LOGO.png";
import styles from "../Styles/Login.module.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img className={styles.logo} src={LOGO} alt="logo" />
          <h2 className={styles.title}>Alumni Login</h2>
        </div>
        <form className={styles.form}>
          <div className={styles.input}>
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
            >
              Login
            </button>
        </form>
          <div className={styles.btns}>
            <button className={styles.btn}>Forget Password</button>
            <button className={styles.btn} onClick={()=>navigate("/alumni/register")} >New Registration</button>
          </div>
      </div>
  );
};
export default Login;
