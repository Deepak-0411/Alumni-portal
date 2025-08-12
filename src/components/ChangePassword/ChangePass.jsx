import { useState, useEffect } from "react";
import styles from "./ChangePass.module.css";
import Input from "./Input";
import Loading from "./Loading";
import { apiRequest } from "./api";
import { toast } from "react-toastify";

const ChangePass = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState({ oldPass: "", newPass: "", cnfPass: "" });
  const [errors, setErrors] = useState({ oldPass: "", newPass: "", cnfPass: "" });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.cnfPass) {
      toast.error("Please fix form errors before submitting.");
      return;
    }

    const response = await apiRequest({
      url: apiEndPointSingle,
      method: "POST",
      body: data,
      setLoading: setIsUploading,
    });

    if (response.status === "success") {
      toast.success(`Password changed! ${response.data.message}`);
    } else if (response.data?.error) {
      toast.error(`Upload failed: ${response.data.error}`, { autoClose: 5000 });
    } else {
      console.error("Error:", response.message);
      toast.error(`Upload failed: ${response.message || "Unknown error"}`);
    }
  };

  const fields = [
    { name: "oldPass", placeholder: "Old Password" },
    { name: "newPass", placeholder: "New Password" },
    { name: "cnfPass", placeholder: "Confirm Password" },
  ];

  return (
    <div className={styles.changePassContainer}>
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

        <button type="submit" className={styles.uploadBtn} disabled={isUploading}>
          {isUploading ? (
            <>
              Change <Loading size="small" color="white" />
            </>
          ) : (
            "Change"
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePass;
