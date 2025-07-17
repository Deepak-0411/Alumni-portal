import ReactDOM from "react-dom";
import styles from "./Overlay.module.css";

const Overlay = ({ imageUrl, children, onClose }) => {
  const handleOverlayClick = (e) => {
    // Close only if background is clicked
    if (e.target.classList.contains(styles.overlay)) {
      onClose();
    }
  };

  const closeBtnSVG = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e3e3e3"
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );

  const content = (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <button
        className={styles.closeBtn}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        {closeBtnSVG}
      </button>

      {imageUrl ? (
        <img className={styles.fullImage} src={imageUrl} alt="Overlay content" />
      ) : (
        children
      )}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("portal-root"));
};

export default Overlay;
