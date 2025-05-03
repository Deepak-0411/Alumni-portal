import styles from "../styles/modules/Input.module.css";

const Input = ({
  type = "",
  name = "",
  placeHolder = "",
  label = "",
  required = false,
  requiredMark = false,
  options = [],
  value = "",
  onChange = () => {},
  error = "",
}) => {
  const inputClass = `${styles.input} ${error ? styles.errorInput : ""}`;

  return (
    <div className={styles.container}>
      {label && (
        <label
          htmlFor={name}
          className={`${styles.label} ${requiredMark ? styles.required : ""}`}
        >
          <span>{label}</span>
        </label>
      )}

      {type === "select" ? (
        <select
          id={name}
          required={required}
          className={inputClass}
          value={value}
          name={name}
          onChange={onChange}
        >
          <option value=""> Select </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "file" ? (
        <input
          type="file"
          id={name}
          required={required}
          className={inputClass}
          name={name}
          onChange={onChange}
          accept="image/*"
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeHolder}
          required={required}
          className={inputClass}
          value={value}
          onChange={onChange}
        />
      )}

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
