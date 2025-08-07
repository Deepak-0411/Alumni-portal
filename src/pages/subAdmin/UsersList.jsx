import { useData } from "../../context/DataContext";
import ContentBox from "../../layouts/ContentBox";
import VerifyUser from "./VerifyUser";

const UsersList = ({ role }) => {
  const {
    verifyUsersList,
    setVerifyUsersList,
    activeUsersList,
    setActiveUsersList,
    approvedUsersList,
    setApprovedUsersList,
  } = useData();

  const { dataList, setDataList, apiGet, title } = (() => {
    switch (role) {
      case "active":
        return {
          dataList: activeUsersList,
          setDataList: setActiveUsersList,
          apiGet: "/api/panel/activeUsers",
          title: "Active Users",
        };
      case "approved":
        return {
          dataList: approvedUsersList,
          setDataList: setApprovedUsersList,
          apiGet: "/api/approval/approved-users",
          title: "Approved Users",
        };
      case "verify":
        return {
          dataList: verifyUsersList,
          setDataList: setVerifyUsersList,
          apiGet: "/api/approval/pending-users",
          title: "Verify Users",
        };

      default:
        return { dataList: [], setDataList: () => {}, apiGet: "", title: "" };
    }
  })();

  const config = {
    isSuperadmin: false,
    createBtnOpen: false,
    title: title,
    apiGet: apiGet,
    apiDelete: ``,
    apiEndPointCreate: ``,
    searchBoxPlaceholder: "Search by name or roll no.",
    idKey: "rollNo",
    nameKey: "Name",
    formFields: {
      fName: { value: "", placeholder: "Name", role: "text" },
      teacherId: { value: "", placeholder: "Teacher ID", role: "text" },
      username: { value: "", placeholder: "Username", role: "text" },
      password: { value: "", placeholder: "Password", role: "text" },
      schoolName: { value: "", placeholder: "School Name", role: "text" },
    },
    tableHeading: [
      "Name",
      "Father's Name",
      "School",
      "Roll no.",
      "Year of Passing",
    ],
    tableColumn: [
      "alumniName",
      "fatherName",
      "schoolName",
      "rollNo",
      "yearOfPassing",
    ],
    dataList,
    setDataList,
    dataOverlayContent: ({ index, onClose, data }) => {
      return (
        <VerifyUser
          filteredData={data}
          setUsersList={setDataList}
          currentIndex={index}
          onClose={onClose}
          showBtns={role === "verify" ? true : false}
        />
      );
    },
  };
  return <ContentBox {...config} />;
};

export default UsersList;
