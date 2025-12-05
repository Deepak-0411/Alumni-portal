import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Overlay from "../Overlay/Overlay";
import Input from "../Input/Input";
import useIsVisible from "../../hooks/useIsVisible";
import Loading from "../Spinner/Loading";

const Table = ({
  tableHeadings = [],
  data = [],
  idKey = "id",
  tableColumn = [],
  showToggleBtn = true,
  handleToggleBtn,
  dataOverlayContent,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(null);
  const { ref, isVisible } = useIsVisible();

  useEffect(() => {
    if (isVisible && hasNextPage) {
      fetchNextPage();
    }
  }, [isVisible, hasNextPage, fetchNextPage]);

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
        <td key={`${colKey}-${index}`}>{item[colKey]}</td>
      ))}
      {showToggleBtn && (
        <td onClick={(e) => e.stopPropagation()} className={styles.noClick}>
          <Input
            type="check"
            value={item.status}
            onChange={() => handleToggleBtn(item)}
          />
        </td>
      )}
    </tr>
  );

  const renderTableBody = () => {
    if (!data.length) {
      return (
        <tr>
          <td colSpan={2 + tableHeadings.length} className={styles.noData}>
            No data found.
          </td>
        </tr>
      );
    }

    return data.map(renderRow);
  };

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableBox}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>{renderTableHeadings()}</thead>
          <tbody className={styles.tableBody}>{renderTableBody()}</tbody>
        </table>

        <div ref={ref} className={styles.loaderBox}>
          {isFetchingNextPage && <Loading size="small" />}
        </div>
      </div>

      {showOverlay && dataOverlayContent && (
        <Overlay onClose={handleOverlayClose}>
          {dataOverlayContent({
            index: overlayIndex,
            data,
            onClose: handleOverlayClose,
          })}
        </Overlay>
      )}
    </div>
  );
};

export default Table;
