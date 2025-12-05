import ContentBoxNormal from "../../layouts/ContentBoxNormal";
import { useSchoolList } from "../../apis/school.query";

const SubAdmin = () => {
  const { data: schoolData } = useSchoolList();

  const config = {
    title: "Sub-Admins",
    apiGet: `/api/panel/view-subadmins`,
    apiToggle: `/api/panel/toggle/`,
    createBtnOpen: true,
    showToggleBtn: true,
    apiEndPointCreate: `/api/subadmin/signup`,
    searchBoxPlaceholder: "Search by username.",
    idKey: "username",
    nameKey: "name",
    addText: "Create Sub-Admin",
    formFields: {
      name: { value: "", placeholder: "Name", role: "text" },
      username: { value: "", placeholder: "Username", role: "text" },
      credential: { value: "", placeholder: "Password", role: "password" },
      schoolName: {
        value: "",
        placeholder: "School Name",
        role: "select",
        options: Object.keys(schoolData || []),
      },
    },
    tableHeading: ["School", "Name", "Username"],
    tableColumn: ["schoolName", "name", "username"],
    // dataOverlayContent: ({ index, onClose }) => {
    // <VerifyUsers
    //   usersList={alumniList}
    //   setUsersList={setAlumniList}
    //   currentIndex={index}
    //   onClose={onClose}
    // />
    // },
  };

  return <ContentBoxNormal {...config} />;
};
export default SubAdmin;
