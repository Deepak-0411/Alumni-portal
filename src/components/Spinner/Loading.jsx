import styles from "./Loading.module.css";

const Loading = ({ color, size = "big", isFullScrn }) => {
  const spinnerStyle = {};
  if (color === "white") {
    spinnerStyle.border = "0.2rem solid #ffffff80";
    spinnerStyle.borderTop = "0.23rem solid #ffffff";
  }
  if (size === "small") {
    spinnerStyle.width = "1.5rem";
    spinnerStyle.height = "1.5rem";
  }

  return (
    <div
      className={`${styles.spinnerContainer} ${
        isFullScrn ? styles.fullScrn : ""
      }`}
    >
      <div className={styles.spinner} style={spinnerStyle}></div>
    </div>
  );
};

export default Loading;
