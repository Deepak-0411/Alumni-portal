import React from "react";
import styles from "./DataCard.module.css";

const DataCard = ({ heading, dataItems, image }) => {
  return (
    <div className={styles.dataBox}>
      {heading && (
        <div className={styles.headingBox}>
          <h2 className={styles.heading}>{heading}</h2>
        </div>
      )}
      <div className={image ? styles.pbox : styles.box}>
        {image && <img className={styles.dp} src={image} alt="Profile Pic" />}
        {dataItems.map((item, index) => (
          <div className={styles.subBox} key={index}>
            <p className={styles.title}>{item.label}</p>
            <p className={styles.data}>{item.value || "-"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCard;
