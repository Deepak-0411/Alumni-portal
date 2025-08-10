import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LOGO from "../assets/GBULOGO.png";
import Input from "../components/Input/Input";
import LoadingScrn from "../components/Spinner/Loading";
import styles from "../styles/modules/auth/Login.module.css";
import apiRequest from "../utility/apiRequest";
import { toast } from "react-toastify";

const Login = ({ user = "user" }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { URL, reqForward, title, inputType, inputLabel } = (() => {
    switch (user) {
      case "superAdmin":
        return {
          URL: "/api/root/login",
          reqForward: "/alumni/superAdmin/",
          title: "Admin Login",
          inputType: "text",
          inputLabel: "User-Id",
        };
      case "subAdmin":
        return {
          URL: "/api/subadmin/login",
          reqForward: "/alumni/sub-admin/verify-users",
          title: "Sub Admin Login",
          inputType: "text",
          inputLabel: "User-Id",
        };
      case "user":
        return {
          URL: "/api/alumni/login",
          reqForward: "/alumni/user/membershipCard",
          title: "Alumni Login",
          inputType: "email",
          inputLabel: "E-mail",
        };
      default:
        return {
          URL: "",
          reqForward: "",
          title: "",
          inputType: "",
          inputLabel: "",
        };
    }
  })();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!(userId && password)) return;

    const response = await apiRequest({
      url: URL,
      method: "POST",
      body: {
        [user === "user" ? "email" : "username"]: userId,
        credential: password,
      },
      setLoading,
    });

    if (response.status === "success") {
      toast.success("LoggedIn Sucessfully!!! ");

      navigate(reqForward);
    } else {
      console.error("Error:", response.message);
      toast.error(`Error: ${response.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img className={styles.logo} src={LOGO} alt="logo" />
        <h2 className={styles.title}>{title}</h2>
      </div>
      <form className={styles.form} onSubmit={(e) => handleLogin(e)}>
        <Input
          type={inputType}
          name={"userId"}
          label={inputLabel}
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
        <div className={styles.btns}>
          <div className={styles.rememberMe}>
            <input
              type="checkbox"
              id="check"
              className={styles.checkBox}
              value={remember}
              checked={true}
              onChange={() => {}}
            />
            <label className={styles.checkLabel} htmlFor="check">
              Remember me
            </label>
          </div>
          {user === "user" && (
            <button
              className={styles.btn}
              onClick={() => navigate("/alumni/forgetPassword")}
            >
              Forget Password
            </button>
          )}
        </div>
        <button
          type="submit"
          className={styles.loginBtn}
          disabled={loading || !(userId && password)}
        >
          {loading ? <LoadingScrn size={"small"} color={"white"} /> : "Login"}
        </button>
      </form>
      {user === "user" && (
        <div >
          <button
            className={styles.checkStatusBtn}
            onClick={() => navigate("/alumni/checkStatus")}
          >
            Check Status
          </button>
          <span className={styles.checkLabel}>
            {"Not registered? "}
            <button
              className={styles.btn}
              onClick={() => navigate("/alumni/register")}
            >
              Create account
            </button>
          </span>
          
        </div>
      )}
    </div>
  );
};
export default Login;
