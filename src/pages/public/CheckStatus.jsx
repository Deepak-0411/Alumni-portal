import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../styles/modules/CheckStatus.module.css";
import Input from "../../components/Input";

const CheckStatus = ({ forgetPassword = false }) => {
  const location = useLocation();
  const [verified, setVerified] = useState(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      handleSearch(location.state.email);
    }
  }, [location.state]);
  
  const handleSearch = (emailToSearch = email) => {
    console.log("Searching for:", emailToSearch);
    // trigger API call here
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
          type={"email"}
          name={"email"}
          placeHolder={"E-mail"}
          required={true}
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className={styles.btn}
          onClick={()=>handleSearch()}
          disabled={!email}
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
