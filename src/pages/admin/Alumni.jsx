import ContentBox from "../../layouts/ContentBox";
import VerifyUser from "../subAdmin/VerifyUser";

const Alumni = () => {
  const config = {
    createBtnOpen: false,
    showToggleBtn: true,
    title: "Alumni",
    apiGet: `/api/panel/admin/activeUsers`,
    apiToggle: `/api/panel/alumnitoggle/`,
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
    tableHeading: ["Name", "Father's Name", "School", "Roll no.", "Card No"],
    tableColumn: ["alumniName", "fatherName", "schoolName", "rollNo", "cardNo"],
    dataOverlayContent: ({ index, onClose, data }) => {
      // console.log("data",data);
      return (
        <VerifyUser
          filteredData={data}
          queryKey={apiGet}
          currentIndex={index}
          onClose={onClose}
        />
      );
    },
  };

  return <ContentBox {...config} />;
};
export default Alumni;
