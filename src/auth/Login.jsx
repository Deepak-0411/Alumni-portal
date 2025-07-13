import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../assets/GBULOGO.png";
import Input from "../components/Input/Input";
import LoadingScrn from "../components/Spinner/Loading";
import styles from "../styles/modules/auth/Login.module.css";
import apiRequest  from "../utility/apiRequest";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = ({ foradmin = false }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {login}=useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!(userId && password)) return;

    const response = await apiRequest({
      url: foradmin ? "/api/subadmin/login" : "/api/alumni/login",
      method: "POST",
      body: { "username" : userId, credential: password },
      token: false,
      setLoading,
    });


    if (response.status === "success") {
      toast.success("LoggedIn Sucessfully!!! ");
      login(response.data.token);      
      foradmin
        ? navigate("/alumni/sub-admin/verify-users-list")
        : navigate("/alumni/user/membershipCard");
    } else {
      console.error("Error:", response.message);
      toast.error(`Error: ${response.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.logo} src={LOGO} alt="logo" />
        <h2 className={styles.title}>{foradmin?"Sub Admin Login":"Alumni Login"}</h2>
      </div>
      <form className={styles.form} onSubmit={(e) => handleLogin(e)}>
        <Input
          type={foradmin ? "text" :"email"}
          name={"userId"}
          label={foradmin ? "User-Id" :"E-mail"}
          required={true}
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
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
          disabled={loading || !(userId && password)}
        >
          {loading ? <LoadingScrn size={"small"} color={"white"} /> : "Login"}
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
