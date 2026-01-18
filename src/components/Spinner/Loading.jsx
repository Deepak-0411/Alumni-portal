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
      <span
        className={`${styles.spinner}  ${styles[size]}
        ${styles[color]}`}
      />
    </div>
  );
};

export default Loading;
