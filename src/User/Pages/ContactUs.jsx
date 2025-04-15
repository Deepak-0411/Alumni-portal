import styles from "../Styles/ContactUs.module.css";

const ContactUs = () => {
  return (
    <div className={styles.container}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Contact Us</h2>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cllgName}>Gautam Buddha University</h3>
            <div className={styles.adderess}>
                <p className={styles.text}>Yamuna Expressway,</p>
                <p className={styles.text}>Greater Noida</p>
                <p className={styles.text}>Gautam Budh Nagar</p>
                <p className={styles.text}>Uttar Pradesh (INDIA) - 201312</p>
                <p className={styles.text}>Phone No : 01202344200</p>
                <p className={styles.text}>Email : info@gbu.ac.in</p>
            </div>
          </div>
        </div>
  )
}
export default ContactUs