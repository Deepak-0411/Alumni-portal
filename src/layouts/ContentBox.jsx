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
import Loading from "../components/Spinner/Loading";

const ContentBox = ({
  isSuperadmin = true,
  showToggleBtn = false,
  createBtnOpen = true,
  title,
  apiGet,
  apiToggle,
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
  const [loading, setLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [userId, setUserId] = useState(false);
  const [msgText, setMsgText] = useState("");

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  const fetchData = async () => {
    const response = await apiRequest({
      url: apiGet,
      method: "GET",
      setLoading,
    });

    if (response.status === "success") {
      if (response?.data.entries) {
        setDataList(response.data.entries);
        console.log(response.data.entries);
        
      }
    } else {
      console.error("Error:", response.message);
      toast.error(`Error: Failed to fetch data.`);
    }
  };

  useEffect(() => {
    if (!Array.isArray(dataList) || dataList.length === 0) {
      fetchData();
    }
  }, []);

  const confirmToggle = async () => {
    if (!Array.isArray(dataList)) return;
    const exists = dataList.some((user) => user[idKey] === userId);
    if (!exists) {
      toast.error("User not found.");
      return;
    }
    const response = await apiRequest({
      url: apiToggle + userId,
      method: "PATCH",
      setLoading: setEditLoading,
    });
    console.log(apiToggle + userId);

    if (response.status === "success") {
      const updated = dataList.map((user) =>
        user[idKey] === userId ? { ...user, status: !user.status } : user
      );

      setDataList(updated);
      setShowConfirm(false);
      toast.success(`Sucessfully ${msgText.toLowerCase()} user ${userId}`);
    } else {
      console.error("Error:", response.message);
      toast.error(`Failed to ${msgText.toLowerCase()} user ${userId}.`);
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setUserId(null);
  };

  const handleToggleBtn = (user) => {
    setShowConfirm(true);
    setUserId(user[idKey]);
    setMsgText(user.status ? "Disable" : "Enable");
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
        (a, b) => (b.status === true) - (a.status === true)
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
            onConfirm={confirmToggle}
            onCancel={cancelDelete}
            action={msgText}
            loading={editLoading}
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

      {loading ? (
        <div className="w-full h-full">
          <Loading />
        </div>
      ) : (
        <Table
          tableHeadings={tableHeading}
          filteredData={sortedData}
          idKey={idKey}
          handleToggleBtn={handleToggleBtn}
          tableColumn={tableColumn}
          dataOverlayContent={dataOverlayContent}
          showToggleBtn={showToggleBtn}
        />
      )}
    </div>
  );
};

export default ContentBox;
