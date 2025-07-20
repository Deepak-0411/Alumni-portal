import React from "react";
import Input from "../Input/Input";
import styles from "./ConfirmationBox.module.css";

function ConfirmationBox({
  message,
  onConfirm,
  onCancel,
  action = "Confirm",
  showInput = false,
  inputValue = "",
  setInputValue = () => {},
  confirmDisabled = false,
  inputPlaceholder = "Enter value...",
  inputLabel = "",
  inputName = "confirmationInput",
  inputError = "", // optional error handling
}) {
  return (
    <div className={styles.modal}>
      <p className={styles.text}>{message || "Are you sure?"}</p>

      {showInput && (
        <div className={styles.inputWrapper}>
          <Input
            label={inputLabel}
            name={inputName}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={inputPlaceholder}
            error={inputError}
            type="text"
          />
        </div>
      )}

      <div className={styles.buttons}>
        <button onClick={onCancel} className={styles.cancel}>
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={styles.confirm}
          disabled={confirmDisabled}
        >
          {action}
        </button>
      </div>
    </div>
  );
}

export default ConfirmationBox;
