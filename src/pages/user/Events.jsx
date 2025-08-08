import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";
import styles from "../../styles/modules/user/Events.module.css";
import Loading from "../../components/Spinner/Loading";

const Events = () => {
  const { events, fetchEvents } = useData();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!Array.isArray(events) || events.length === 0) {
      fetchEvents(setLoading);
    }
  }, []);

  return (
    <div className={styles.events}>
      <div className={styles.eventTitleContainer}>
        <h2 className={styles.eventTitle}>EVENTS 2025</h2>
      </div>

      {loading ? (
        <div className="flex items-center justify-center w-[100%] h-[20vh]">
        <Loading /></div>
      ) : events.length > 0 ? (
        events.map((event) => {
          return (
            <div className={styles.eventCard} key={event._id}>
              <h3 className={styles.eventName}>{event.title}</h3>
              <p className={styles.aboutEvent}>{event.description}</p>
            </div>
          );
        })
      ) : (
        <p className={styles.eventName}>Comming Soon</p>
      )}
    </div>
  );
};
export default Events;

/* <div>
  <button className={styles.registerBtn} type="button">
    Register Now
  </button>
</div> */
