import React from "react";
import styles from "./ConfirmationBox.module.css";

function ConfirmationBox({ message, onConfirm, onCancel, action }) {
  return (
    <div className={styles.modal}>
      <p className={styles.text}>{message || "Are you sure?"}</p>
      <div className={styles.buttons}>
        <button onClick={onCancel} className={styles.cancel}>
          Cancel
        </button>
        <button onClick={onConfirm} className={styles.confirm}>
          {action}
        </button>
      </div>
    </div>
  );
}

export default ConfirmationBox;
