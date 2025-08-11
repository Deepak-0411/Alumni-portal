import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import styles from "./NotableAlumni.module.css";

import "swiper/css";
import "swiper/css/navigation";
import Card from "./Card";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

const alumni = [
  {
    name: "Joey",
    year: "2012",
    description:
      "Software engineer at Google, focused on AI and machine learning.",
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
    description: "Entrepreneur and founder of a successful health startup.",
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
    description: "Marketing manager at a global tech firm.",
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
    description: "UX/UI designer working on global apps.",
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
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        // breakpoints={{
        //   640: { slidesPerView: 1 },
        //   768: { slidesPerView: 2 },
        //   1024: { slidesPerView: 2 },
        // }}
        className={styles.swiper}
        wrapperClass={styles.slides}
      >
        {alumni.map((alum, index) => (
          <SwiperSlide
            key={index}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Card {...alum} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom buttons with icons */}
      <button className={`custom-prev ${styles.customPrev}`}>
        <AiFillCaretLeft />
      </button>
      <button className={`custom-next ${styles.customNext}`}>
        <AiFillCaretRight />
      </button>
    </div>
  );
};

export default NotableAlumni;
