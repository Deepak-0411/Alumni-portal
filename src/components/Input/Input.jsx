import { useState } from "react";
import styles from "./Input.module.css";

const Input = ({
  type = "text",
  name = "",
  placeHolder = "",
  label = "",
  required = false,
  requiredMark = false,
  options = [],
  value = "",
  onChange,
  className = "",
  addonClassName = "",
  error = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClass = `
    ${className || styles.input}
    ${error ? styles.errorInput : ""}
    ${addonClassName || ""}
  `.trim();

  const inputId = props.id || name || "input-component";

  if (type === "check") {
    return (
      <div className="relative inline-block w-11 h-5">
        <input
          id={inputId}
          type="checkbox"
          checked={value}
          onChange={onChange}
          className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-green-600 cursor-pointer transition-colors duration-300"
        />
        <label
          htmlFor={inputId}
          className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-green-600 cursor-pointer"
        ></label>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {label && (
        <label
          htmlFor={inputId}
          className={`${styles.label} ${requiredMark ? styles.required : ""}`}
        >
          <span>{label}</span>
        </label>
      )}

      {type === "select" ? (
        <select
          id={inputId}
          required={required}
          className={inputClass}
          value={value}
          name={name}
          onChange={onChange}
        >
          <option value="">Select</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "file" ? (
        <input
          type="file"
          id={inputId}
          required={required}
          className={inputClass}
          name={name}
          onChange={onChange}
          accept="image/*"
        />
      ) : type === "password" ? (
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            id={inputId}
            placeholder={placeHolder}
            required={required}
            className={inputClass}
            value={value}
            onChange={onChange}
            {...props}
          />
          <span
            className={styles.passwordToggle}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? showPasswordSVG : hidePasswordSVG}
          </span>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          id={inputId}
          placeholder={placeHolder}
          required={required}
          className={inputClass}
          value={value}
          onChange={onChange}
          {...props}
        />
      )}

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
