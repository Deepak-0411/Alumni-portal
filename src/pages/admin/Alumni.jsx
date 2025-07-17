import { useData } from "../../context/DataContext";
import ContentBox from "../../layouts/ContentBox";
import VerifyUsersList from "../subAdmin/VerifyUser";

const Alumni = () => {
  const { alumniList, setAlumniList } = useData();

  const config = {
    createBtnOpen: false,
    title: "Alumni",
    apiGet: ``,
    apiDelete: ``,
    apiEndPointCreate: ``,
    searchBoxPlaceholder: "Search by card no. or roll no.",
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
      "Card No",
    ],
    tableColumn: ["Name", "fathersName", "school", "rollNo", "cardNo"],
    dataList: alumniList,
    setDataList: setAlumniList,
    dataOverlayContent: ({ index, onClose }) => (
      <VerifyUsersList
        usersList={alumniList}
        setUsersList={setAlumniList}
        currentIndex={index}
        onClose={onClose}
      />
    ),
  };

  return (
    <ContentBox {...config} />
  );
};
export default Alumni;
