import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../styles/modules/CheckStatus.module.css";
import Input from "../../components/Input";

const CheckStatus = ({ forgetPassword = false }) => {
  const location = useLocation();
  const [verified] = useState(null);
  const [paid] = useState(null);
  const [error] = useState("");
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      handleSearch(location.state.email);
    }
  }, [location.state]);

  const handleSearch = (e,emailToSearch = email) => {
    e.preventDefault();
    console.log("Searching for:", emailToSearch);
    // trigger API call here
  };

  const forgetPass = (e) => {
    e.preventDefault();
    console.log("Get Clicked");
  };
  const handlePayClick = () => {
    console.log("Pay Clicked");
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>
        {forgetPassword ? "Forget password" : "Check Account Status"}
      </p>
      <form>
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
          onClick={(e) => forgetPass(e)}
          disabled={!email}
        >
          Search
        </button>
      </div>
      </form>

      {verified ? (
        <div className={styles.data}>
          <p className={styles.verified}> Account Verified </p>
          {paid && (
            <button className={styles.btn} onClick={handleGetClick}>
              Get Password on Mail
            </button>
          )}
          {!paid && (
            <button className={styles.btn} onClick={handlePayClick}>
              Proceed to Pay
            </button>
          )}
        </div>
      ) : (
        verified != null && (
          <div className={styles.data}>
            <p> We'll let you know as soon as your verification is complete.</p>
          </div>
        )
      )}
      {error && <p className={styles.error}> Error : {error}</p>}
    </div>
  );
};

export default CheckStatus;
