import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import {
  FaLinkedin,
  FaInstagram,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";
import styles from "./NotableAlumni.module.css";

import "swiper/css";
import "swiper/css/navigation";

const alumni = [
  {
    name: "Joey",
    year: "2012",
    desc: "Software engineer at Google, focused on AI and machine learning.",
    image: "https://i.pravatar.cc/150?img=12",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Riya",
    year: "2014",
    desc: "Entrepreneur and founder of a successful health startup.",
    image: "https://i.pravatar.cc/150?img=31",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Alex",
    year: "2015",
    desc: "Marketing manager at a global tech firm.",
    image: "https://i.pravatar.cc/150?img=45",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    },
  },
  {
    name: "Sam",
    year: "2017",
    desc: "UX/UI designer working on global apps.",
    image: "https://i.pravatar.cc/150?img=53",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
    },
  },
];

const NotableAlumni = () => {
  return (
    <div className={styles.outerdiv}>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 500000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className={styles.swiper}
        wrapperClass={styles.slides}
      >
        {alumni.map((alum, index) => (
          <SwiperSlide key={index}>
            <div className={styles.card}>
              <img src={alum.image} alt={alum.name} className={styles.avatar} />
              <div className={styles.content}>
                <div className={styles.topRow}>
                  <h3 className={styles.name}>{alum.name}</h3>
                  <div className={styles.socials}>
                    <a
                      href={alum.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={alum.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href={alum.socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaXTwitter />
                    </a>
                  </div>
                </div>
                <p className={styles.year}>
                  <strong>{alum.year}</strong>
                </p>
                <p className={styles.desc}>{alum.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom buttons with icons */}
      {/* <button className={`custom-prev ${styles.custom - prev}`}>
        <FaArrowLeft />
      </button>
      <button className={`custom-next ${styles.custom - next}`}>
        <FaArrowRight />
      </button> */}
    </div>
  );
};

export default NotableAlumni;
