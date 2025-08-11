import React, { useState } from "react";
import styles from "./Card.module.css";
import { FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
import Overlay from "../Overlay/Overlay";
import AutoSwiper from "../AutoSlider/AutoSwiper";

const CardCover = ({ name, year, description, image, socials }) => {
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

const notableAlumnis = [
  {
    name: "Joey",
    year: "2012",
    description:
      "Software engineer at Google, focused on AI and machine learning.",
    image: "https://i.pravatar.cc/150?img=12",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      x: "https://twitter.com",
    },
  },
  {
    name: "Riya",
    year: "2014",
    description: "Entrepreneur and founder of a successful health startup.",
    image: "https://i.pravatar.cc/150?img=31",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      x: "https://twitter.com",
    },
  },
  {
    name: "Alex",
    year: "2015",
    description: "Marketing manager at a global tech firm.",
    image: "https://i.pravatar.cc/150?img=45",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      x: "https://twitter.com",
    },
  },
  {
    name: "Sam",
    year: "2017",
    description: "UX/UI designer working on global apps.",
    image: "https://i.pravatar.cc/150?img=53",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      x: "https://twitter.com",
    },
  },
];

const Card = () => {
  return (
    <AutoSwiper>
      {notableAlumnis.map((alumni) => (
        <CardCover key={alumni.name} {...alumni} />
      ))}
    </AutoSwiper>
  );
};

export default Card;
