import styles from "../Styles/Home.module.css";
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
              Our alumni are the torchbearers of Gautam Buddha University,
              illuminating the world with their knowledge, integrity, and
              innovation. This portal is a bridge to reconnect, collaborate, and
              inspire future generations.
            </p>
            <p className={styles.VCSignature}> — Prof. Rana Pratap Singh <br/>
            Vice Chancellor</p>
          </div>
          <img className={styles.VCimg} src={VCimg} alt="Vice Chancellor" />
        </div>
      </div>

      <div className={styles.notableAlumni}>
        <p className={styles.notableAlumniText}>Notable Alumni</p>
      </div>
    </div>
  );
};
export default Home;
