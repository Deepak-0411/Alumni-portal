import { useState } from "react";
import styles from "./Create.module.css";
import { toast } from "react-toastify";
import apiRequest from "../../apis/apiRequest";
import Input from "../Input/Input";
import { useMutation } from "@tanstack/react-query";

const Create = ({ dataToSend = {}, apiEndPointSingle }) => {
  const [data, setData] = useState(
    Object.fromEntries(
      Object.entries(dataToSend).map(([key, obj]) => [key, obj.value])
    )
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { mutate, isPending: isUploading } = useMutation({
    mutationFn: async ({ url, body }) => {
      return await apiRequest({
        url,
        method: "POST",
        body,
      });
    },
    onSuccess: (response) => {
      toast.success(`Added successfully! ${response?.message}`);
    },
    onError: (error) => {
      console.error("Error:", error?.message);
      toast.error(`Upload failed: ${error?.message || "Unknown error"}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate({ url: apiEndPointSingle, body: data });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {Object.keys(dataToSend).map((key) => {
          return (
            <div key={key}>
              <Input
                type={dataToSend[key].role}
                name={key}
                placeHolder={dataToSend[key].placeholder}
                options={dataToSend[key].options}
                required={true}
                value={data[key] || ""}
                onChange={(e) => handleChange(e)}
              />
            </div>
          );
        })}

        <button
          type="submit"
          className={styles.uploadBtn}
          disabled={isUploading}
        >
          {isUploading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default Create;
