import styles from "../../styles/modules/public/Home.module.css";
import png1 from "../../assets/studentIllustrations/studentsImg1.webp";
import png2 from "../../assets/studentIllustrations/studentsImg2.webp";
import png3 from "../../assets/studentIllustrations/studentsImg3.webp";
import VCimg from "../../assets/VCimg.webp";
import Loading from "../../components/Spinner/Loading";
import Card from "../../components/NotableAlumni/Card";
import HomeWriteup from "../../components/HomeWriteup/HomeWriteup";
import { useEvents } from "../../apis/events.query";
const Home = () => {
  const { data: events, isLoading } = useEvents();

  const StudentPngSection = () => {
    return (
      <div className={styles.studentPng}>
        <div className={styles.pngs}>
          <img
            className={`${styles.png} ${styles.revertPng}`}
            src={png1}
            alt="Student png"
          />
          <img className={`${styles.png} `} src={png2} alt="Student png" />
          <img className={`${styles.png} `} src={png3} alt="Student png" />
        </div>
        <div className={styles.tagline}>
          <h1 className={styles.taglineText}>Reconnect. Inspire. Grow.</h1>
        </div>
      </div>
    );
  };
  const VcSirSection = () => {
    return (
      <div className={styles.VCCard}>
        <div className={styles.card}>
          <div className={styles.VCwordsContainer}>
            <p className={styles.VCwords}>
              Our alumni light the world with their knowledge, integrity, and
              innovation. This portal bridges connections, fosters
              collaboration, and inspires future generations.
            </p>
            <p className={styles.VCSignature}>
              — Prof. Rana Pratap Singh <br />
              Vice Chancellor
            </p>
          </div>
          <div>
            <img className={styles.VCimg} src={VCimg} alt="Vice Chancellor" />
          </div>
        </div>
      </div>
    );
  };

  const NotableAlumniSection = () => {
    return (
      <div className={styles.notableAlumni}>
        <p className={styles.notableAlumniText}> &nbsp; Notable Alumni</p>
        <Card />
      </div>
    );
  };
  const EventsSection = () => {
    return (
      <div className={styles.events}>
        <div className={styles.eventTitleContainer}>
          <h2 className={styles.eventTitle}>EVENTS 2025</h2>
        </div>
        {isLoading ? (
          <Loading color={"white"} />
        ) : events.length > 0 ? (
          <div className={styles.eventList}>
            {events.map((event, i) => {
              return (
                <div className={styles.eventCard} key={event._id + i}>
                  <h3 className={styles.eventName}>{event.title}</h3>
                  {/* {event.tags.map((tag) => {
                    return (
                      <div className={styles.eventTagsContainer}>
                        <span className={styles.eventTags}>{tag}</span>
                      </div>
                    );
                  })} */}
                  <p className={styles.aboutEvent}>{event.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className={styles.eventName}>Comming Soon</p>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.topSection}>
        {/* students pngs */}

        <StudentPngSection />

        {/* vc sir section */}
        <VcSirSection />
      </div>

      {/* WriteUp Section */}
      <HomeWriteup />

      {/* notable alumni's section */}
      <NotableAlumniSection />

      {/* events section */}
      <EventsSection />
    </div>
  );
};
export default Home;
