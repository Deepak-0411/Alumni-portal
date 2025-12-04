import { useState, useEffect } from "react";
import styles from "../../components/ChangePassword/ChangePass.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../apis/apiRequest";
import Input from "../../components/Input/Input";
import Loading from "../../components/Spinner/Loading";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await apiRequest({
      url: "/api/alumni/forgot-password",
      method: "POST",
      body: {
        email,
      },
      setLoading,
    });

    if (response.status === "success") {
      toast.success(`${response.data.message}`);
    } else if (response.data?.error) {
      toast.error(`something went wrong`);
      toast.error(`${response.message || "Unknown error"}`);
    } else {
      console.error("Error:", response.message);
      toast.error(`something went wrong`);
      toast.error(`${response.message || "Unknown error"}`);
    }
  };

  return (
    <div className={styles.changePassContainer}>
      <p className={styles.heading}>Forget Password</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="email"
          name={email}
          placeholder={"Enter your email"}
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className={styles.uploadBtn} disabled={loading}>
          {loading ? (
            <>
              Get link <Loading size={"small"} color={"white"} />
            </>
          ) : (
            "Get link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
