import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import LOGO from "../assets/GBULOGO.webp";
import Input from "../components/Input/Input";
import LoadingScrn from "../components/Spinner/Loading";
import styles from "../styles/modules/auth/Login.module.css";
import apiRequest from "../apis/apiRequest";
import { toast } from "react-toastify";

const Login = ({ user = "user" }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [remember] = useState(false);

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

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ userId, password, user }) => {
      return await apiRequest({
        url: URL,
        method: "POST",
        body: {
          [user === "user" ? "email" : "username"]: userId,
          credential: password,
        },
      });
    },
    onSuccess: (response, variables) => {
      toast.success("LoggedIn Successfully!!!");
      localStorage.setItem(variables.user, "true");
      navigate(variables.reqForward);
    },
    onError: (error) => {
      console.error("Login Error:", error);
      toast.error(error?.message || "Something went wrong!");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!(userId && password)) return;

    mutate({ userId, password, user, reqForward });
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
              type="button"
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
          disabled={isPending || !(userId && password)}
        >
          {isPending ? <LoadingScrn size={"small"} color={"white"} /> : "Login"}
        </button>
      </form>
      {user === "user" && (
        <div>
          <Link to="/alumni/checkStatus">
            <button className={styles.checkStatusBtn}>Check Status</button>
          </Link>
          <span className={styles.checkLabel}>
            {"Not registered? "}
            <Link to="/alumni/register">
              <button className={styles.btn}>Create account</button>
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};
export default Login;
