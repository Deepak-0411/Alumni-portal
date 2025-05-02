import { useState } from "react";
import styles from "../../styles/modules/CheckStatus.module.css";
import Input from "../../components/Input";

const CheckStatus = ({ forgetPassword = false }) => {
  const [verified, setVerified] = useState(null);
  const [error, setError] = useState("");
  const [enrollmentno, setEnrollmentno] = useState("");
  const handleSearch = () => {
    console.log(enrollmentno);
  };
  const handleClick = () => {
    console.log("Clicked");
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>
        {forgetPassword ? "Forget password" : "Check Account Status"}
      </p>
      <div className={styles.searchBar}>
        <Input
          type={"number"}
          name={"enrollmentno"}
          placeHolder={"Enrollment Number"}
          required={true}
          value={enrollmentno}
          onChange={(e) => setEnrollmentno(e.target.value)}
        />
        <button
          className={styles.btn}
          onClick={handleSearch}
          disabled={!enrollmentno}
        >
          Search
        </button>
      </div>

      {verified && (
        <div className={styles.data}>
          <p className={styles.verified}> Account Verified </p>
          <button className={styles.btn} onClick={handleClick}>
            Get UserID and Password on Mail
          </button>
        </div>
      )}
      {!verified && verified != null && (
        <div className={styles.data}>
          <p> We'll let you know as soon as your verification is complete.</p>
        </div>
      )}
      {error && <p className={styles.error}> Error : {error}</p>}
    </div>
  );
};
export default CheckStatus;
