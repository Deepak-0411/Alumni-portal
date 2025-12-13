import React, { useState } from "react";
import styles from "./Card.module.css";
import { FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";
import Overlay from "../Overlay/Overlay";
import AutoSwiper from "../AutoSlider/AutoSwiper";
import fallbackIMG from "../../assets/user.webp";
import MohammadZakwanZaheen from "../../assets/notableAlumnis/MohammadZakwanZaheen.webp";
import RohitDwivedi from "../../assets/notableAlumnis/RohitDwivedi.webp";
import SachinMishra from "../../assets/notableAlumnis/SachinMishra.webp";
import MoumitaDas from "../../assets/notableAlumnis/MoumitaDas.webp";
import WarisNawazKhan from "../../assets/notableAlumnis/WarisNawazKhan.webp";
import SANYUKTASRIVASTAVA from "../../assets/notableAlumnis/SANYUKTASRIVASTAVA.webp";
import DineshKumar from "../../assets/notableAlumnis/DineshKumar.webp";
import PreetyBajwa from "../../assets/notableAlumnis/PreetyBajwa.webp";
import RituBhardwaj from "../../assets/notableAlumnis/RituBhardwaj.webp";
import AbhishekKumar from "../../assets/notableAlumnis/AbhishekKumar.webp";
import SumitKumarSingh from "../../assets/notableAlumnis/SumitKumarSingh.webp";
import DivyaNangia from "../../assets/notableAlumnis/DivyaNangia.webp";

const CardCover = ({ name, year, description, image, socials }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageSection}>
          <img
            loading="lazy"
            src={image || fallbackIMG}
            alt={name}
            className={styles.profileImage}
          />
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
            {socials?.x && (
              <a
                href={socials?.x}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <FaXTwitter className={styles.icon} />
              </a>
            )}
            {socials?.linkedin && (
              <a
                href={socials?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <FaLinkedin className={styles.icon} />
              </a>
            )}
            {socials?.instagram && (
              <a
                href={socials?.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.iconLink}
              >
                <FaInstagram className={styles.icon} />
              </a>
            )}
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
    name: "Divya Nangia",
    year: "2010-2015",
    description:
      "Senior Software Engineer at GE Digital |Cybersecurity|SCADA|IEC61850|NERC-CIP|Power System",
    image: DivyaNangia,
    socials: {
      linkedin: "https://www.linkedin.com/in/divya-nangia-50b2ab8a",
    },
  },
  {
    name: "Mohammad Zakwan Zaheen",
    year: "2019-2023",
    description:
      "Mechanical Engineer - Radiation Safety Officer - NDT Engineer",
    image: MohammadZakwanZaheen,
    socials: {
      linkedin: "https://www.linkedin.com/in/mohammad-zakwan-zaheen-b9246521a",
    },
  },
  {
    name: "Sumit Kumar Singh",
    year: "2009-2012",
    description:
      "Salesforce - Technical Solution Lead / Architect / Manager | Agentic AI & Agentforce Champion | CSPO",
    image: SumitKumarSingh,
    socials: {
      linkedin: "https://www.linkedin.com/in/sumit-kumar-singh-20396a46",
    },
  },
  {
    name: "Abhishek Kumar",
    year: "2012-2017",
    description: "Cell Therapy & Immunotherapy",
    image: AbhishekKumar,
    socials: {
      linkedin: "https://www.linkedin.com/in/abhishek-k-473106b8",
    },
  },
  {
    name: "Rohit Dwivedi ",
    year: "2011-2013",
    description:
      "Associate Director- Priority Banking| IIM Calcutta |Securities and Commodities Authority, UAE (SCA Certified)",
    image: RohitDwivedi,
    socials: {
      linkedin: "https://www.linkedin.com/in/rohitdwivedi-adcb",
    },
  },
  {
    name: "Sachin Mishra ",
    year: "2010-2015",
    description:
      "Founder, CEO & Director @ Synaptic Delver, Singapore NeuroTechnology & NeuroRobotics",
    image: SachinMishra,
    socials: {
      linkedin: "https://www.linkedin.com/in/sachinmishra92me",
    },
  },
  {
    name: "Moumita Das ",
    year: "2011-2016",
    description:
      "Innovation Manager @ GSI Helmholtz | Innovation Marketing | Project Management | Managed GSI/FAIR Innovation LinkedIn Page",
    image: MoumitaDas,
    socials: {
      linkedin: "https://www.linkedin.com/in/moumitadas20",
    },
  },
  {
    name: "Waris Nawaz Khan",
    year: "2010-2015",
    description:
      "Post Doctoral Researcher at Polytechnique Montreal II Ph.D. Indian Institute of Technology Jodhpur",
    image: WarisNawazKhan,
    socials: {
      linkedin: "https://www.linkedin.com/in/waris-nawaz-khan-aab2a84b",
    },
  },
  {
    name: "Sanyukta Srivanstava",
    year: "2010-2015",
    description:
      "Supervisor Food Safety and Assurance| Supervisor Sanitation| PCQI",
    image: SANYUKTASRIVASTAVA,
    socials: {
      linkedin: "https://www.linkedin.com/in/sanyuktasrivastava",
    },
  },
  {
    name: "Dinesh Kumar",
    year: "2008-2010",
    description: "Associate Director – Digital & Finance Transformation | SAP",
    image: DineshKumar,
    socials: {
      linkedin: "https://www.linkedin.com/in/dinesh-kumar-12180617",
    },
  },
  {
    name: "Preety Bajwa",
    year: "2009-2012",
    description: "Cancer Research Scientist|Gynaecology Oncology",
    image: PreetyBajwa,
    socials: {
      linkedin: "https://www.linkedin.com/in/preetybajwa",
    },
  },
  {
    name: "Ritu Bhardwaj ",
    year: "2009-2012",
    description:
      "Healthcare Strategy | Business Transformation | Regulatory Compliance | Innovation | CAPM",
    image: RituBhardwaj,
    socials: {
      linkedin: "https://www.linkedin.com/in/ritubhardwajj",
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
