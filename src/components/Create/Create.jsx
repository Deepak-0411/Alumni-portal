import { useState } from "react";
import styles from "./Create.module.css";
import { toast } from "react-toastify";
import apiRequest from "../../utility/apiRequest";
import Input from "../Input/Input";

const Create = ({ dataToSend = {}, apiEndPointSingle }) => {
  const [isUploading, setIsUploading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await apiRequest({
      url: apiEndPointSingle,
      method: "POST",
      body: data,
      setLoading: setIsUploading,
    });

    if (response.status === "success") {
      toast.success(`Added successfully! ${response.data.message}`);
    } else if (response.data?.error) {
      toast.error(
        `Upload failed: ${response.data.error || "Unknown error 11"}`,
        {
          autoClose: 5000,
        }
      );
    } else {
      console.error("Error:", response.message);
      toast.error(`Upload failed: ${response.data || "Unknown error"}`);
    }
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
