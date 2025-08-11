import React, { useState } from "react";
import styles from "./Card.module.css";
import { FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
import Overlay from "../Overlay/Overlay";

const Card = ({ name, year, description, image, socials }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageSection}>
          <img src={image} alt="Joey" className={styles.profileImage} />
        </div>
        <div className={styles.textSection}>
          <div className={styles.userInfo}>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.year}>{year}</p>
            <p
              className={styles.description}
              onClick={() => setShowOverlay(true)}
            >
              {description}
            </p>
          </div>
          <div className={styles.socials}>
            <a
              href={socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <FaXTwitter className={styles.icon} />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <FaLinkedin className={styles.icon} />
            </a>
            <a
              href={socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconLink}
            >
              <FaInstagram className={styles.icon} />
            </a>
          </div>
        </div>
      </div>
      {showOverlay && (
        <Overlay onClose={() => setShowOverlay(false)}>
          <div className={styles.OverlayDiv}>
            <p className={styles.OverlayP}>{description}</p>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default Card;
