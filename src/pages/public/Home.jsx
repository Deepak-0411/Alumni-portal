import styles from "../../styles/modules/Home.module.css";
import png1 from "../../assets/studentsImg1.png";
import png2 from "../../assets/studentsImg2.png";
import png3 from "../../assets/studentsImg3.png";
import VCimg from "../../assets/VCimg.png";
const Home = () => {
  return (
    <div className={styles.container}>
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

      <div className={styles.VCCard}>
        <div className={styles.card}>
          <div className={styles.VCwordsContainer}>
            <p className={styles.VCwords}>
              "Our alumni are the torchbearers of Gautam Buddha University,
              illuminating the world with their knowledge, integrity, and
              innovation. This portal is a bridge to reconnect, collaborate, and
              inspire future generations."
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

      {/* <div className={styles.notableAlumni}>
        <p className={styles.notableAlumniText}>Notable Alumni</p>
      </div> */}

      <div className={styles.events}>
        <div className={styles.eventTitleContainer}>
          <h2 className={styles.eventTitle}>EVENTS 2025</h2>
        </div>
        <div className={styles.eventList}>
          <div className={styles.eventCard}>
            <h3 className={styles.eventName}>Dawat-E-Gbu</h3>
            <p className={styles.aboutEvent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            {/* <div>
              <button className={styles.registerBtn} type="button">
                Register Now
              </button>
            </div> */}
          </div>
          <div className={styles.eventCard}>
            <h3 className={styles.eventName}>Dawat-E-Gbu</h3>
            <p className={styles.aboutEvent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            {/* <div>
              <button className={styles.registerBtn} type="button">
                Register Now
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
