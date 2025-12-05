import ContentBox from "../../layouts/ContentBox";

const Finance = () => {
  const config = {
    createBtnOpen: false,
    showToggleBtn: false,
    isInfiniteScroll: true,
    title: "Finance",
    apiGet: `/api/transactions`,
    searchBoxPlaceholder: "Search by roll no.",
    idKey: "rollNo",
    nameKey: "name",
    tableHeading: ["Alumni Name", "Roll No.", "Txn-ID", "Txn-Date"],
    tableColumn: ["alumniName", "rollNo", "trxId", "trx_date"],
  };
  return <ContentBox {...config} />;
};
export default Finance;
