import React, { useState } from "react";
import styles from "./Table.module.css";
import Overlay from "../Overlay/Overlay";
import Input from "../Input/Input";
import { truncateText } from "../../utility/truncateText";

const Table = ({
  tableHeadings = [],
  filteredData = [],
  idKey = "id",
  tableColumn = [],
  showToggleBtn = true,
  handleToggleBtn,
  dataOverlayContent,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(null);

  const handleRowClick = (index) => {
    if (dataOverlayContent) {
      setOverlayIndex(index);
      setShowOverlay(true);
    }
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
    setOverlayIndex(null);
  };

  const renderTableHeadings = () => (
    <tr>
      <th>SR No.</th>
      {tableHeadings.map((heading, index) => (
        <th key={heading + index}>{heading}</th>
      ))}
      {showToggleBtn && <th>Status</th>}
    </tr>
  );

  const renderRow = (item, index) => (
    <tr
      key={`${item[idKey] || index}`}
      onClick={() => handleRowClick(index)}
      className={showToggleBtn && !item.status ? styles.fadeText : ""}
    >
      <td>{index + 1}</td>
      {tableColumn.map((colKey) => (
        <td key={`${colKey}-${index}`}>{truncateText(item[colKey])}</td>
      ))}
      {showToggleBtn && (
        <td
          onClick={(e) => e.stopPropagation()}
          className={`${styles.noClick} "${item["rollNo"]}" `}
        >
          <Input
            type="check"
            value={item.status}
            addonClassName={item["rollNo"]}
            id={item["rollNo"]}
            onChange={() => handleToggleBtn(item)}
          />
        </td>
      )}
    </tr>
  );

  const renderTableBody = () => {
    if (!filteredData.length) {
      return (
        <tr>
          <td colSpan={2 + tableHeadings.length} className={styles.noData}>
            No data found.
          </td>
        </tr>
      );
    }

    return filteredData.map(renderRow);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableBox}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>{renderTableHeadings()}</thead>
          <tbody className={styles.tableBody}>{renderTableBody()}</tbody>
        </table>
      </div>

      {showOverlay && dataOverlayContent && (
        <Overlay onClose={handleOverlayClose}>
          {/* {console.log("filteredData", filteredData)} */}
          {dataOverlayContent({
            index: overlayIndex,
            data: filteredData,
            onClose: handleOverlayClose,
          })}
        </Overlay>
      )}
    </div>
  );
};

export default Table;
