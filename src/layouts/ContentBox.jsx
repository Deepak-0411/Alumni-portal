import { useEffect, useState } from "react";
import Input from "../components/Input/Input";
import Table from "../components/Table/Table";
import styles from "../styles/modules/layout/Container.module.css";
import useDebouncedValue from "../hooks/Debounce";
import apiRequest from "../utility/apiRequest";
import Overlay from "../components/Overlay/Overlay";
import Create from "../components/Create/Create";
import { toast } from "react-toastify";
import ConfirmationBox from "../components/ConfirmationBox/ConfirmationBox";

const ContentBox = ({
  isSuperadmin = true,
  showToggleBtn = false,
  createBtnOpen = true,
  title,
  apiGet,
  apiDelete,
  apiEndPointCreate,
  searchBoxPlaceholder,
  idKey,
  nameKey,
  addText,
  formFields,
  tableHeading,
  tableColumn,
  dataList = [],
  setDataList,
  dataOverlayContent,
}) => {
  const [searchTerm, setSearchTearm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userId, setUserId] = useState(false);
  const [msgText, setMsgText] = useState("");

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  const fetchData = async () => {
    const response = await apiRequest({
      url: apiGet,
      method: "GET",
      token: token,
      setLoading,
    });

    if (response.status === "success") {
      setDataList(response.data.entries);
    } else {
      console.error("Error:", response.message);
      toast.error(`Error: Failed to fetch data.`);
    }
  };

  useEffect(() => {
    if (!Array.isArray(dataList) || dataList.length === 0) {
      // fetchData();
    }
  }, []);

  const confirmDelete = () => {
    if (!Array.isArray(dataList)) return;
    const exists = dataList.some((user) => user[idKey] === userId);
    if (!exists) {
      toast.error("User not found.");
      return;
    }

    const updated = dataList.map((user) =>
      user[idKey] === userId ? { ...user, isActive: !user.isActive } : user
    );

    setDataList(updated);
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setUserId(null);
  };

  const handleToggleBtn = (user) => {
    setShowConfirm(true);
    setUserId(user[idKey]);
    setMsgText(user.isActive ? "Disable" : "Enable");
  };

  const filteredData = Array.isArray(dataList)
    ? dataList.filter((item) => {
        const name = item[nameKey]?.toLowerCase() || "";
        const id = item[idKey]?.toString().toLowerCase() || "";
        return (
          name.includes(debouncedSearchTerm.toLowerCase()) ||
          id.includes(debouncedSearchTerm.toLowerCase())
        );
      })
    : [];

  const sortedData = showToggleBtn
    ? [...filteredData].sort(
        (a, b) => (b.isActive === true) - (a.isActive === true)
      )
    : filteredData;

  return (
    <div className={styles.container}>
      {isCreating && (
        <Overlay onClose={() => setIsCreating(false)}>
          <Create
            dataToSend={formFields}
            apiEndPointSingle={apiEndPointCreate}
          />
        </Overlay>
      )}

      {showConfirm && (
        <Overlay onClose={cancelDelete}>
          <ConfirmationBox
            message={`Do you really want to ${msgText.toLowerCase()} user ${userId} ?`}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            action={msgText}
          />
        </Overlay>
      )}

      <div className={styles.headingDiv}>
        <h1 className={styles.heading}>{title}</h1>
        <div className={styles.interactionSide}>
          <Input
            type={"text"}
            name={"searchBox"}
            placeHolder={searchBoxPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTearm(e.target.value)}
            className={styles.searchbar}
          />
          {createBtnOpen && (
            <div>
              <button
                className={styles.createBtn}
                onClick={() => setIsCreating(true)}
              >
                + {addText}
              </button>
            </div>
          )}
        </div>
      </div>

      <Table
        tableHeadings={tableHeading}
        filteredData={sortedData}
        idKey={idKey}
        handleToggleBtn={handleToggleBtn}
        tableColumn={tableColumn}
        dataOverlayContent={dataOverlayContent}
        showToggleBtn={showToggleBtn}
      />
    </div>
  );
};

export default ContentBox;
