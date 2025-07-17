import { useEffect, useState } from "react";
import Input from "../components/Input/Input";
import Table from "../components/Table/Table";
import styles from "../styles/modules/layout/Container.module.css";
import useDebouncedValue from "../hooks/Debounce";

const ContentBox = ({
  isSuperadmin = true,
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
}) => {
  const [searchTerm, setSearchTearm] = useState("");

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
      fetchData();
    }
  }, []);

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
          {isSuperadmin && (
            <div>
              <button className={styles.createBtn}>+ {addText}</button>
            </div>
          )}
        </div>
      </div>

      <Table
        tableHeadings={tableHeading}
        filteredData={filteredData}
        idKey={idKey}
        tableColumn={tableColumn}
      />
    </div>
  );
};

export default ContentBox;
