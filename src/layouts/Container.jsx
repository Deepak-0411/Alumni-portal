import { useState } from "react";
import Input from "../components/Input/Input";
import styles from "../styles/modules/layout/Container.module.css";

const Container = ({ heading, placeholder, isSuperadmin = true }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.headingDiv}>
        <h1 className={styles.heading}>{heading}</h1>
        <div className={styles.interactionSide}>
          <Input
            type={"text"}
            name={"searchBox"}
            placeHolder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.searchbar}
          />
          {isSuperadmin && (
            <div>
              <button className={styles.createBtn}>+ Create</button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div>
          {Array(20)
            .fill()
            .map((_, idx) => (
              <div key={idx} className="bg-violet-200 h-11 rounded-lg" />
            ))}
        </div>
      </div>
    </div>
  );
};
export default Container;
