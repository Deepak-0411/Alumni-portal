import { useState } from "react";
import styles from "../../components/ChangePassword/ChangePass.module.css";
import { toast } from "react-toastify";
import apiRequest from "../../apis/apiRequest";
import Input from "../../components/Input/Input";
import Loading from "../../components/Spinner/Loading";
import { useMutation } from "@tanstack/react-query";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await apiRequest({
        url: "/api/alumni/forgot-password",
        method: "POST",
        body: {
          email,
        },
      });
    },
    onSuccess: (response) => {
      console.log("response", response);

      toast.success(`${response?.message}`);
    },
    onError: (error) => {
      console.error("Error:", error?.message);
      toast.error(`${error?.message || "Unknown error"}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate();
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

        <button type="submit" className={styles.uploadBtn} disabled={isPending}>
          {isPending ? (
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
