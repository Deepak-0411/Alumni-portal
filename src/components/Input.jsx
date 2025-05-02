import styles from "../styles/modules/Input.module.css";

const Input = ({
  type="",
  name="",
  placeHolder="",
  label="",
  required="",
  requiredMark="",
  options=[],
  value="",
  onChange="",
}) => {    

  return (
    <div className={styles.container}>
      {label &&<label
        htmlFor={label}
        className={`${styles.label} ${requiredMark ? styles.required : ""}`}
      >
        <span> {label} </span>
      </label>}

      {type === "select" ? (
        <select
          id={label}
          required={required}
          className={styles.input}
          value={value}
          name={name}
          onChange={(e)=>onChange(e)}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "file" ? (
        <input
          type="file"
          id={label}
          required={required}
          className={styles.input}
          accept="image/*"
        />
      ) : (
        <input
          type={type}
          name={name}
          id={label}
          placeholder={placeHolder}
          required={required}
          className={styles.input}
          value={value}
          onChange={(e)=>onChange(e)}
        />
      )}
    </div>
  );
};
export default Input;
