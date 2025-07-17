import { useData } from "../../context/DataContext";
import ContentBox from "../../layouts/ContentBox";
import VerifyUsersList from "../subAdmin/VerifyUser";

const SubAdmin = () => {
  const { subAdminList, setSubAdminList } = useData();

  const config = {
    createBtnOpen: true,
    title: "Sub-Admins",
    apiGet: ``,
    apiDelete: ``,
    apiEndPointCreate: ``,
    searchBoxPlaceholder: "Search by username.",
    idKey: "username",
    nameKey: "username",
    addText: "Create Sub-Admin",
    formFields: {
      Name: { value: "", placeholder: "Name", role: "text" },
      username: { value: "", placeholder: "Username", role: "text" },
      password: { value: "", placeholder: "Password", role: "password" },
      schoolName: { value: "", placeholder: "School Name", role: "text" },
    },
    tableHeading: ["School", "Name", "Username"],
    tableColumn: ["school", "Name", "username"],
    dataList: subAdminList,
    setDataList: setSubAdminList,
    dataOverlayContent: ({ index, onClose }) => {
      // <VerifyUsersList
      //   usersList={alumniList}
      //   setUsersList={setAlumniList}
      //   currentIndex={index}
      //   onClose={onClose}
      // />
    },
  };

  return <ContentBox {...config} />;
};
export default SubAdmin;
