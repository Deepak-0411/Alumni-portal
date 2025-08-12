import { useEffect, useState } from "react";
import styles from "../../styles/modules/public/CheckStatus.module.css";
import Input from "../../components/Input/Input";
import Loading from "../../components/Spinner/Loading";
import { toast } from "react-toastify";
import apiRequest from "../../utility/apiRequest";
import { useNavigate } from "react-router-dom";
import Payment from "../../components/Payment/Payment";

const CheckStatus = () => {
  const [isVerified, setIsVerified] = useState(null);
  const [isPaid, setIsPaid] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsPaid(null);
    setIsVerified(null);
    const response = await apiRequest({
      url: `/api/user/check-status`,
      method: "POST",
      body: {
        email: email,
      },
      setLoading,
    });

    if (response.status === "success") {
      setIsPaid(response.data?.isPaid);
      setIsVerified(response.data?.isVerified);
    } else {
      console.error("Error:", response.message);
      toast.error(`${response.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Check Account Status</p>
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
      ) : isVerified ? (
        <div className={styles.data}>
          <p className={styles.verified}> Account Verified </p>
          {isPaid === false && <Payment email={email} />}
          {isPaid && (
            <button
              className={styles.btn}
              onClick={() => {
                navigate("/alumni/login");
              }}
            >
              Proceed to Login
            </button>
          )}
        </div>
      ) : (
        isVerified === false && (
          <div className={styles.data}>
            <p>
              You are not yet verified — please wait a moment.
              <br />
              We’re verifying your details and will confirm once the process is
              complete.
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default CheckStatus;
