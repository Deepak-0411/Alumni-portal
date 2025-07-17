import React, { useState } from "react";
import styles from "./Table.module.css";
import Overlay from "../Overlay/Overlay";

const Table = ({
  tableHeadings=[],
  filteredData=[],
  idKey="",
  tableColumn=[],
  dataOverlayContent=()=>{}, 
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(null);

  const handleDataClick = (index) => {
    setOverlayIndex(index);
    if (dataOverlayContent) {
      setShowOverlay(true);
    }
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableBox}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th className={styles.tableHeading}>SR No.</th>
              {tableHeadings.map((heading, index) => (
                <th key={heading + index} className={styles.tableHeading}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item[idKey] + index}
                  onClick={() => handleDataClick(index)}
                >
                  <td>{index + 1}</td>
                  {tableColumn.map((row) => (
                    <td key={row + index}>{item[row]}</td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2 + tableHeadings.length}
                  className={styles.noData}
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showOverlay && dataOverlayContent && (
        <Overlay onClose={() => setShowOverlay(false)}>
          {dataOverlayContent({
            index: overlayIndex,
            onClose: () => setShowOverlay(false),
          })}
        </Overlay>
      )}
    </div>
  );
};

export default Table;
