import styles from "./Loading.module.css";

const Loading = ({ color = "primary", size = "big", isFullScrn = false }) => {
  return (
    <div
      className={`
        ${styles.spinnerContainer}
        ${isFullScrn ? styles.fullScrn : ""}
      `}
      aria-busy="true"
      aria-live="polite"
    >
      <div className={`${styles[size + "Area"]}`}>
        <span
          className={`${styles.spinner}  ${styles[size]}
        ${styles[color]}`}
        />
      </div>
    </div>
  );
};

export default Loading;
