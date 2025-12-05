import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import Overlay from "../Overlay/Overlay";
import Input from "../Input/Input";
import { useIsVisible } from "../../hooks/useIsVisible";
import { MdDelete } from "react-icons/md";
import Loading from "../Spinner/Loading";

const Table = ({
  tableHeadings = [],
  data,
  idKey = "id",
  tableColumn = [],
  dataOverlayContent,
  showToggleBtn = false,
  handleToggleBtn = () => {},
  showDeleteBtn = false,
  handleDeleteBtn = () => {},
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) => {
  console.log(data);

  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayIndex, setOverlayIndex] = useState(null);

  const { ref, isVisible } = useIsVisible();

  useEffect(() => {
    if (isVisible && hasNextPage && fetchNextPage) {
      fetchNextPage();
    }
  }, [isVisible, hasNextPage, fetchNextPage]);

  const handleRowClick = (index) => {
    if (!dataOverlayContent) return;
    setOverlayIndex(index);
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
    setOverlayIndex(null);
  };

  // HEADERS
  const renderTableHeadings = () => (
    <tr>
      <th>SR No.</th>

      {tableHeadings.map((heading, index) => (
        <th key={heading + index}>{heading}</th>
      ))}

      {showToggleBtn && <th>Status</th>}
      {showDeleteBtn && <th>Delete</th>}
    </tr>
  );

  // RENDER ROWS
  const renderRow = (item, index) => (
    <tr
      key={item[idKey] || index}
      onClick={() => handleRowClick(index)}
      className={showToggleBtn && item.status === false ? styles.fadeText : ""}
    >
      <td>{index + 1}</td>

      {tableColumn.map((col) => (
        <td key={`${col}-${index}`}>{item[col]}</td>
      ))}

      {showToggleBtn && (
        <td className={styles.noClick} onClick={(e) => e.stopPropagation()}>
          <Input
            type="check"
            value={item.status}
            onChange={() => handleToggleBtn(item)}
          />
        </td>
      )}

      {showDeleteBtn && (
        <td className={styles.noClick} onClick={(e) => e.stopPropagation()}>
          <button
            className={styles.deleteBtn}
            onClick={() => handleDeleteBtn(item)}
          >
            <MdDelete />
          </button>
        </td>
      )}
    </tr>
  );

  const renderTableBody = () => {
    if (data.length === 0) {
      return (
        <tr>
          <td
            colSpan={
              1 +
              tableHeadings.length +
              (showToggleBtn ? 1 : 0) +
              (showDeleteBtn ? 1 : 0)
            }
            className={styles.noData}
          >
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

        {/* Intersection observer loader row */}
        <div ref={ref} className={styles.loaderBox}>
          {isFetchingNextPage && <Loading size="small" />}
        </div>
      </div>

      {/* Row Overlay */}
      {showOverlay && dataOverlayContent && (
        <Overlay onClose={handleOverlayClose}>
          {dataOverlayContent({
            index: overlayIndex,
            data: data, // pass flattened data
            onClose: handleOverlayClose,
          })}
        </Overlay>
      )}
    </div>
  );
};

export default Table;
