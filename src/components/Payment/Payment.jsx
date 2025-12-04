import { useMakePayment } from "../../hooks/useMakePayment";
import Loading from "../Spinner/Loading";
import styles from "./Payment.module.css";

const Payment = ({ email }) => {
  const { mutate: makePayment, isLoading } = useMakePayment();
  const handlePayClick = () => {
    makePayment(email);
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
        disabled={isLoading}
      >
        Proceed to Pay
        {isLoading && <Loading size="small" color="white" />}
      </button>
    </div>
  );
};

export default Payment;
