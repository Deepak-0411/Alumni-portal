import ContentBoxInfinite from "../../layouts/ContentBoxInfinite";

const Finance = () => {
  const config = {
    title: "Finance",
    apiGet: `/api/transactions`,
    createBtnOpen: false,
    showToggleBtn: false,
    searchBoxPlaceholder: "Search by roll no.",
    idKey: "rollNo",
    nameKey: "name",
    tableHeading: ["Alumni Name", "Roll No.", "Txn-ID", "Txn-Date"],
    tableColumn: ["alumniName", "rollNo", "trxId", "trx_date"],
  };
  return <ContentBoxInfinite {...config} />;
};
export default Finance;
