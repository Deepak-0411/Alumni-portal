import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ChangePass.module.css";
import { toast } from "react-toastify";
import Input from "../Input/Input";
import Loading from "../Spinner/Loading";
import apiRequest from "../../apis/apiRequest";
import { useMutation } from "@tanstack/react-query";

const ChangePass = ({ isForgotMode = false }) => {
  const [data, setData] = useState({ oldPass: "", newPass: "", cnfPass: "" });
  const [errors, setErrors] = useState({
    oldPass: "",
    newPass: "",
    cnfPass: "",
  });

  const navigate = useNavigate();
  const { token } = useParams();

  // Validate confirm password
  useEffect(() => {
    if (data.cnfPass && data.newPass && data.cnfPass !== data.newPass) {
      setErrors((prev) => ({ ...prev, cnfPass: "Passwords do not match." }));
    } else {
      setErrors((prev) => ({ ...prev, cnfPass: "" }));
    }
  }, [data.cnfPass, data.newPass]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate, isPending: isUploading } = useMutation({
    mutationFn: async (URL, body) => {
      return await apiRequest({
        url: URL,
        method: "POST",
        body,
      });
    },
    onSuccess: (response) => {
      if (response.status === "success") {
        toast.success(`${response.data.message}`);
        navigate("/alumni/user/profile");
      } else if (response.data?.error) {
        toast.error(`Something went wrong`);
        toast.error(`${response.message || "Unknown error"}`);
      }
    },
    onError: (error) => {
      console.error("Error:", error.message);
      toast.error(`${error.message || "Unknown error"}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.cnfPass) {
      toast.error("Please fix form errors before submitting.");
      return;
    }

    const endpoint = isForgotMode
      ? "/api/alumni/forgot-password/reset/" + token
      : "/api/alumni/profile/change-password";

    const body = isForgotMode
      ? {
          token,
          newCredential: data.cnfPass,
        }
      : {
          credential: data.oldPass,
          newCredential: data.cnfPass,
        };

    mutate(endpoint, body);
  };

  const fields = [
    ...(isForgotMode ? [] : [{ name: "oldPass", placeholder: "Old Password" }]),
    { name: "newPass", placeholder: "New Password" },
    { name: "cnfPass", placeholder: "Confirm Password" },
  ];

  return (
    <div className={styles.changePassContainer}>
      <p className={styles.heading}>
        {isForgotMode ? "Set New Password" : "Change Password"}
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        {fields.map(({ name, placeholder }) => (
          <div key={name}>
            <Input
              type="password"
              name={name}
              placeholder={placeholder}
              value={data[name]}
              required
              onChange={handleChange}
              error={errors[name]}
            />
          </div>
        ))}

        <button
          type="submit"
          className={styles.uploadBtn}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              {isForgotMode ? "Set Password" : "Change"}
              <Loading size={"small"} color={"white"} />
            </>
          ) : isForgotMode ? (
            "Set Password"
          ) : (
            "Change"
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePass;
