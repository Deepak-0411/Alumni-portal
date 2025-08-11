import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import styles from "./AutoSwiper.module.css";

import "swiper/css";
import "swiper/css/navigation";

const AutoSwiper = ({ children }) => {
  const totalSlides = React.Children.count(children);

  if (totalSlides === 0) return null;

  return (
    <div className={styles.outerdiv}>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={totalSlides > 1} // loop only if more than 1 slide
        slidesPerView={1}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className={styles.swiper}
        wrapperClass={styles.slides}
      >
        {React.Children.map(children, (child, index) => (
          <SwiperSlide key={index} style={{ display: "flex", justifyContent: "center" }}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      {totalSlides > 1 && (
        <>
          <button className={`custom-prev ${styles.customPrev}`}>
            <AiFillCaretLeft />
          </button>
          <button className={`custom-next ${styles.customNext}`}>
            <AiFillCaretRight />
          </button>
        </>
      )}
    </div>
  );
};

export default AutoSwiper;
