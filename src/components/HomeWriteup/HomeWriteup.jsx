import React from "react";
import styles from "./HomeWriteup.module.css";
import { FaLinkedin, FaStar } from "react-icons/fa6";
import { BsGlobe2 } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import fallBackUserwebp from "../../assets/user.webp";
import fallBackAssociationwebp from "../../assets/imgNotFound.webp";
import alumniimg1 from "../../assets/gallery/alumniimg1.webp";
import alumniimg3 from "../../assets/gallery/alumniimg3.webp";
import alumniimg4 from "../../assets/gallery/alumniimg4.webp";
import ajitKumar from "../../assets/associationMembers/ajitKumar.webp";
import amitJ from "../../assets/associationMembers/amitJ.webp";
import gargiSharma from "../../assets/associationMembers/gargiSharma.webp";
import vikramSingh from "../../assets/associationMembers/vikramSingh.webp";
import sunilSharma from "../../assets/associationMembers/sunilSharma.webp";

import AutoSwiper from "../AutoSlider/AutoSwiper";
import { useNavigate } from "react-router-dom";

const alumniCard = ({ dp, name, post, desc, linkedInUrl }) => {
  return (
    <div className={styles.alumniCard} key={name}>
      <div className={styles.leftSection}>
        <img
          src={dp || fallBackUserwebp}
          alt={name}
          className={styles.alumniDP}
        />
      </div>
      <div className={styles.rightSection}>
        <h4>
          {name}
          <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <span></span>
        </h4>
        <h5>{post}</h5>
        <p>
          {desc.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

const distAlumniData = [
  {
    dp: ajitKumar,
    name: "Dr. Ajit Kumar",
    post: "President GBUAA",
    desc: "Director of Public Relations at Sharda University.\n He brings visionary leadership and a deep passion for building meaningfulalumni engagement.",
    linkedInUrl: "https://www.linkedin.com/in/drajitskumarsharda/",
  },
  {
    dp: amitJ,
    name: "Mr Amit Jha",
    post: "Vice President GBUAA",
    desc: "HR Manager at JSW Energy Ltd.\nHe is a seasoned corporate leader with expertise in Performance Management System, PolicyDrafting & Development, Talent Acquisition & Talent Management.",
    linkedInUrl: "https://www.linkedin.com/in/amit-hr/",
  },

  {
    dp: sunilSharma,
    name: "Mr. Sunil Sharma",
    post: "Secretary GBUAA",
    desc: "Assistant General Manager - IT at CSElectric.\nHe contributed over 18 years of rich experience in the IT field, playing a pivotal role in driving the digital transformation and operational effectiveness of the association.",
    linkedInUrl: "https://www.linkedin.com/in/sunil-sharma-6a85a662/",
  },
  {
    dp: gargiSharma,
    name: "Ms Gargi Sharma",
    post: "Dy. Secretary GBUAA",
    desc: "Experienced Legal Associate with ademonstrated history of working in the law practice industry. Skilled in Legal Assistance, Analytical Skills, Microsoft Word, Case Studies, and Case Analysis.",
    linkedInUrl: "https://www.linkedin.com/in/gargi-sharma-ba7464126/",
  },
  {
    dp: vikramSingh,
    name: "Mr Vikram Singh",
    post: "Treasurer GBUAA",
    desc: "Manager- Content at UpGrad.\nHe is Data and Mathematics Research Enthusiast, having expertise in the area of AI & ML.",
    linkedInUrl: "https://www.linkedin.com/in/vikram-singh0996/",
  },
];
const AssociationImages = [alumniimg1, alumniimg3, alumniimg4];

export default function HomeWriteup() {
  const navigate = useNavigate();
  return (
    <div className={styles.alumniContainer}>
      <h1 className={styles.title}>
        Gautam Buddha University Alumni Association (GBUAA)
      </h1>
      <h2 className={styles.subtitle}>STRENGTHENING BONDS BEYOND GRADUATION</h2>

      <div className={styles.aboutStatSection}>
        <h3 className={styles.aboutSectionTitle}>About GBUAA</h3>
        <p>
          Gautam Buddha University (GBU), Greater Noida, Uttar Pradesh with its
          commitment to academic excellence and holistic development, has
          nurtured generations of professionals, thinkers, and leaders who have
          gone on to make a meaningful impact across the globe. The
          accomplishments of its alumni are a source of pride for Gautam Buddha
          University. Following their successful graduation from the University,
          our alumni have gone on to achieve greater success as business owners,
          executives, industrialists, scholars, researchers, bureaucrats, and
          more. Alumni from GBU have always felt a connection to their old
          mater, even when their goals led them in other areas. With over 10,000
          alumni worldwide, they have played a significant role in enhancing
          Gautam Buddha University’s reputation. The Gautam Buddha University
          Alumni Association (GBUAA) serves as the cornerstone for reconnecting
          and celebrating this remarkable community
        </p>

        <div className={styles.statsSection}>
          <div className={styles.statCard}>
            <div className={styles.icon}>
              <BsGlobe2 />
            </div>
            <h4>10,000+ Alumni</h4>
            <p>
              Spread across
              <br /> the globe
            </p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.icon}>
              <RiTeamFill />
            </div>
            <h4>Worldwide Network</h4>
            <p>
              Connect.
              <br /> Collaborate.
              <br /> Celebrate.
            </p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.icon}>
              <FaStar />
            </div>
            <h4>Global Impact</h4>
            <p>
              Leaders across <br />
              industries
            </p>
          </div>
        </div>

        <div className={styles.connectSection}>
          <h4>Stay Connected with Your Alma Mater</h4>
          <p>
            Join the GBU Alumni Association to network, contribute and inspire
            future generations.
          </p>
          <button
            className={styles.registerBtn}
            onClick={() => navigate("/alumni/register")}
          >
            Register as Alumni
          </button>
        </div>
      </div>

      <div className={styles.distinguishedAlumni}>
        <h3 className={styles.subHeading}>&nbsp; Distinguished Alumni</h3>
        <div className={styles.distinguishedAlumniCards}>
          {distAlumniData.map((data) => alumniCard(data))}
        </div>
      </div>

      <div className={styles.imgGallery}>
        <h3 className={styles.subHeading}>&nbsp; Gallery</h3>
        <AutoSwiper>
          {AssociationImages.map((AssociationImage, index) => (
            <img
              src={AssociationImage || fallBackAssociationwebp}
              alt="Image"
              key={index}
              className={styles.associationImage}
            />
          ))}
        </AutoSwiper>
      </div>
    </div>
  );
}
