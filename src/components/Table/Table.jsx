import React, { useState } from "react";
import styles from "./Table.module.css";
import Overlay from "../Overlay/Overlay";
import Input from "../Input/Input";

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
  const [selectedSortedIndex, setSelectedSortedIndex] = useState(null);

  const sortedData = showToggleBtn
    ? [...filteredData].sort(
        (a, b) => (b.isActive === true) - (a.isActive === true)
      )
    : filteredData;

  const handleRowClick = (sortedIndex) => {
    if (dataOverlayContent) {
      setSelectedSortedIndex(sortedIndex);
      setShowOverlay(true);
    }
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
    setSelectedSortedIndex(null);
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

  const renderRow = (item, sortedIndex) => {
    return (
      <tr
        key={`${item[idKey] || sortedIndex}`}
        onClick={() => handleRowClick(sortedIndex)}
        className={showToggleBtn && !item.isActive ? styles.fadeText : ""}
      >
        <td>{sortedIndex + 1}</td>
        {tableColumn.map((colKey) => (
          <td key={`${colKey}-${sortedIndex}`}>{item[colKey]}</td>
        ))}
        {showToggleBtn && (
          <td onClick={(e) => e.stopPropagation()} className={styles.noClick}>
            <Input
              type="check"
              value={item.isActive}
              onChange={() => handleToggleBtn(item[idKey])}
            />
          </td>
        )}
      </tr>
    );
  };

  const renderTableBody = () => {
    if (!sortedData.length) {
      return (
        <tr>
          <td colSpan={2 + tableHeadings.length} className={styles.noData}>
            No data found.
          </td>
        </tr>
      );
    }

    return sortedData.map(renderRow);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableBox}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>{renderTableHeadings()}</thead>
          <tbody className={styles.tableBody}>{renderTableBody()}</tbody>
        </table>
      </div>

      {showOverlay && dataOverlayContent && selectedSortedIndex !== null && (
        <Overlay onClose={handleOverlayClose}>
          {dataOverlayContent({
            data: sortedData,
            index: selectedSortedIndex,
            onClose: handleOverlayClose,
          })}
        </Overlay>
      )}
    </div>
  );
};

export default Table;