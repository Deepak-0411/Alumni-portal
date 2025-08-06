import { useData } from "../../context/DataContext";
import ContentBox from "../../layouts/ContentBox";

const CreateEvents = () => {
  const { subAdminList, setSubAdminList } = useData();

  const config = {
    createBtnOpen: true,
    showToggleBtn: true,
    title: "Events",
    apiGet: `/api/events/`,
    apiToggle: `/api/panel/toggle/`,
    apiEndPointCreate: `/api/events/`,
    searchBoxPlaceholder: "Search by name.",
    idKey: "username",
    nameKey: "name",
    addText: "Create a Event",
    formFields: {
      name: { value: "", placeholder: "Name", role: "text" },
      username: { value: "", placeholder: "Username", role: "text" },
      credential: { value: "", placeholder: "Password", role: "password" },
      schoolName: { value: "", placeholder: "School Name", role: "text" },
    },
    tableHeading: ["School", "Name", "Username"],
    tableColumn: ["schoolName", "name", "username"],
    dataList: subAdminList,
    setDataList: setSubAdminList,
    dataOverlayContent: ({ index, onClose }) => {
      // <VerifyUsers
      //   usersList={alumniList}
      //   setUsersList={setAlumniList}
      //   currentIndex={index}
      //   onClose={onClose}
      // />
    },
  };

  return <ContentBox {...config} />;
};
export default CreateEvents;
