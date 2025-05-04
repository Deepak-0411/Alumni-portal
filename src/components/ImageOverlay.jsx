import styles from "../styles/modules/ImageOverlay.module.css";

const ImageOverlay = ({ imageUrl, onClose }) => {
  const handleOverlayClick = (e) => {
    // Close only if clicked on the background, not the image or button
    if (e.target.classList.contains(styles.overlay)) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <button className={styles.closeBtn} onClick={onClose}>
        ✖
      </button>
      <img className={styles.fullImage} src={imageUrl} alt="Degree Picture" />
    </div>
  );
};

export default ImageOverlay;
