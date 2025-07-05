import styles from "../../styles/modules/user/Events.module.css";

const Events = () => {
  return (
    <div className={styles.events}>
      <div className={styles.eventTitleContainer}>
        <h2 className={styles.eventTitle}>EVENTS 2025</h2>
      </div>
      <div className={styles.eventCard}>
        <h3 className={styles.eventName}>Dawat-E-Gbu</h3>
        <p className={styles.aboutEvent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <div>
          <button className={styles.registerBtn} type="button">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};
export default Events;
