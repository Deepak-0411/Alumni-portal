import { useData } from "../../context/DataContext";
import ContentBox from "../../layouts/ContentBox";
import VerifyUser from "./VerifyUser";

const VerifyUsersList = ({ isForActiveUsers = false }) => {
  const {
    verifyUsersList,
    setVerifyUsersList,
    activeUsersList,
    setActiveUsersList,
  } = useData();  
  
  const dataList = isForActiveUsers ? activeUsersList : verifyUsersList;
  const setDataList = isForActiveUsers
    ? setActiveUsersList
    : setVerifyUsersList;

  const config = {
    isSuperadmin: false,
    createBtnOpen:false,
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
      "school",
      "rollNo",
      "yearOfPassing",
    ],
    dataList,
    setDataList,
    dataOverlayContent: ({ index, onClose ,data}) => (
      <VerifyUser
        usersList={dataList}
        sortedData={data}
        setUsersList={setDataList}
        currentIndex={index}
        onClose={onClose}
      />
    ),
  };
  return <ContentBox {...config} />;
};

export default VerifyUsersList;
