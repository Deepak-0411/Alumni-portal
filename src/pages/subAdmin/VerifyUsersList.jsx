import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import ContentBox from "../../layouts/ContentBox";

const VerifyUsersList = ({ isForActiveUsers = false }) => {
  const {
    verifyUsersList,
    setVerifyUsersList,
    activeUsersList,
    setActiveUsersList,
  } = useData();

  const config = {
    isSuperadmin: false,
    title: isForActiveUsers ? "Active Users" : "Verify Users",
    apiGet: ``,
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
      "Name",
      "fathersName",
      "schoolName",
      "rollNo",
      "yearOfPassing",
    ],
    dataList: isForActiveUsers ? activeUsersList : verifyUsersList,
    setDataList: isForActiveUsers ? setVerifyUsersList : setVerifyUsersList,
  };
  return <ContentBox {...config} />;
};

export default VerifyUsersList;
