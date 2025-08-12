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
        Your Alumni Journey Doesn’t End at Graduation — It Begins! <br />
        <strong>
          Lifetime Membership: ₹1000.
          <br />
        </strong>{" "}
        Stay connected, collaborate with inspiring peers, and unlock exclusive
        perks — forever. One payment, endless opportunities to grow, network,
        and celebrate our shared pride.
        <br />
        <strong>Join today. Stay connected for a lifetime.</strong>
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
