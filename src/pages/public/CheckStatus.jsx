import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../styles/modules/public/CheckStatus.module.css";
import Input from "../../components/Input/Input";
import Loading from "../../components/Spinner/Loading";
import { toast } from "react-toastify";
import apiRequest from "../../utility/apiRequest";

const CheckStatus = () => {
  const [verified, setVerified] = useState(null);
  const [paid, setPaid] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email) return;

  };

  const handlePayClick = () => {
    console.log("Pay Clicked");
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>
        Check Account Status
      </p>
      <form onSubmit={(e) => handleSearch(e)}>
        <div className={styles.searchBar}>
          <Input
            type={"email"}
            name={"email"}
            placeHolder={"E-mail"}
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.btn} type="submit" disabled={!email}>
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <Loading />
      ) : verified ? (
        <div className={styles.data}>
          <p className={styles.verified}> Account Verified </p>
          {paid===false && (
            <button className={styles.btn} onClick={handlePayClick}>
              Proceed to Pay
            </button>
          )}
        </div>
      ) : (
        verified===false && (
          <div className={styles.data}>
            <p> We'll let you know as soon as your verification is complete.</p>
          </div>
        )
      )}
    </div>
  );
};

export default CheckStatus;
