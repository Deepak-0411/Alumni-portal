import React from "react";
import styles from "./DataCard.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DataCard = ({
  heading,
  dataItems = [],
  image,
  loading = false,
  imageInput = null,
}) => {
  return (
    <div className={styles.dataBox}>
      {heading && (
        <div className={styles.headingBox}>
          <h2 className={styles.heading}>{heading}</h2>
        </div>
      )}

      <div
        className={
          image
            ? styles.pbox
            : dataItems.length > 1
            ? styles.box
            : styles.singleBox
        }
      >
        {/* Profile Picture */}
        <div className={styles.imageWrapper}>
          {loading && image ? (
            <Skeleton circle height={80} width={80} />
          ) : (
            image && <img className={styles.dp} src={image} alt="Profile Pic" />
          )}

          {/* Show file input if in edit mode */}
          {imageInput && (
            <div className={styles.imageInputWrapper}>
              <label className={styles.changeBtnLabel}>
                {imageInput}
              </label>
            </div>
          )}
        </div>

        {/* Data fields */}
        {dataItems.map((item, index) => (
          <div className={styles.subBox} key={index}>
            {React.isValidElement(item) ? (
              item
            ) : (
              <>
                <p className={styles.title}>{item.label}</p>
                {loading ? (
                  <Skeleton
                    height={30}
                    width={"100%"}
                    style={{
                      maxWidth: "15rem",
                      minWidth: "8rem",
                    }}
                  />
                ) : (
                  <p className={styles.data}>{item.value || "-"}</p>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCard;
