import { useState } from "react";
import Loading from "../Spinner/Loading";
import styles from "./Payment.module.css";
import makePayment from "../../utility/makePayment";

const Payment = ({ email }) => {
  const [loading, setLoading] = useState(false);

  const handlePayClick = () => {
    makePayment(email, setLoading);
  };

  return (
    <div className={styles.container}>
      <p className={styles.message}>
        Join the Alumni Association Today — One-time Membership ₹1000 Stay
        connected, network with fellow graduates, and enjoy exclusive member
        benefits for life.
      </p>
      <button
        className={styles.btn}
        onClick={handlePayClick}
        disabled={loading}
      >
        Proceed to Pay
        {loading && <Loading size="small" color="white" />}
      </button>
    </div>
  );
};
export default Payment;
