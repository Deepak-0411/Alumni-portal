import { useEffect, useState } from "react";
import Input from "../components/Input/Input";
import Table from "../components/Table/Table";
import styles from "../styles/modules/layout/Container.module.css";
import useDebouncedValue from "../hooks/Debounce";
import apiRequest from "../utility/apiRequest";
import Overlay from "../components/Overlay/Overlay";
import Create from "../components/Create/Create";
import { toast } from "react-toastify";

const ContentBox = ({
  isSuperadmin = true,
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

  const handleToggleBtn = (userId) => {
    if (!Array.isArray(dataList)) return;
    console.log(userId);
    

    const exists = dataList.some((user) => user[idKey] === userId);
    if (!exists) {
      toast.error("User not found.");
      return;
    }

    const updated = dataList.map((user) =>
      user[idKey] === userId ? { ...user, isActive: !user.isActive } : user
    );

    setDataList(updated);
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
        filteredData={filteredData}
        idKey={idKey}
        handleToggleBtn={handleToggleBtn}
        tableColumn={tableColumn}
        dataOverlayContent={dataOverlayContent}
        showToggleBtn={isSuperadmin}
      />
    </div>
  );
};

export default ContentBox;
