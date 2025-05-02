import { useEffect, useState } from "react";
import DP from "../../assets/VCimg.png";

import styles from "../../styles/modules/MembershipCard.module.css";

const ContactUs = () => {
  const [data, setData] = useState([
    {
      "Personal Information": {
        DOB: "20/12/1994",
        "Phone No.": "+91 6725 2889",
      },
    },
    {
      Residence: {
        Country: "20/12/1994",
      },
    },
    {
      "Card Information": {
        Batch: "2025",
        Validity: "2030",
      },
    },
  ]);
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h2 className={styles.title}>Membership Card</h2>
      </div>
      <div className={styles.card}>
        <div className={styles.leftCol}>
          <img className={styles.userdp} src={DP} alt="Profile Pic" />
          <p className={styles.name}> Deepak Kumar</p>
        </div>
        <div className={styles.rightCol}>
          {data.map((section, index) => {
            const [title, content] = Object.entries(section)[0];

            return (
              <div className={styles.box} key={index}>
                <h2 className={styles.heading}>{title}</h2>
                <div className={styles.innerBox}>
                  {Object.entries(content).map(([subHeading, value]) => (
                    <div className={styles.subBox} key={subHeading}>
                      <p className={styles.subHeading}>{subHeading}</p>
                      <p className={styles.data}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ContactUs;
