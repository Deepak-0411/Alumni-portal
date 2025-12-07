import styles from "../../styles/modules/user/Events.module.css";
import Loading from "../../components/Spinner/Loading";
import { MdLocationOn } from "react-icons/md";
import { BsCalendar3Event } from "react-icons/bs";
import { useEvents } from "../../apis/events.query";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Events = () => {
  const { data: events = [], isLoading, isError } = useEvents();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch events");
    }
  }, [isError]);

  return (
    <div className={styles.events}>
      <div className={styles.eventTitleContainer}>
        <h2 className={styles.eventTitle}>EVENTS 2025</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center w-[100%] h-[20vh]">
          <Loading />
        </div>
      ) : events.length > 0 ? (
        events.map((event) => {
          return (
            <div className={styles.eventCard} key={event.id}>
              <h3 className={styles.eventName}>{event.title}</h3>
              <p className={styles.aboutEvent}>{event.description}</p>
              <div className={styles.extras}>
                <span className={styles.extrasInfo}>
                  <MdLocationOn /> {event.venue}
                </span>
                <span className={styles.extrasInfo}>
                  <BsCalendar3Event />
                  {event.date}
                </span>
              </div>
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
