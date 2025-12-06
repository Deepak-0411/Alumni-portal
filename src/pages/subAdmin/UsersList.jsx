import ContentBoxInfinite from "../../layouts/ContentBoxInfinite";
import VerifyUser from "./VerifyUser";

const UsersList = ({ role }) => {
  const { apiGet, title } = (() => {
    switch (role) {
      case "active":
        return {
          apiGet: "/api/approval/activeUsers",
          title: "Active Users",
        };
      case "approved":
        return {
          apiGet: "/api/approval/approved-users",
          title: "Approved Users",
        };
      case "verify":
        return {
          apiGet: "/api/approval/pending-users",
          title: "Verify Users",
        };

      default:
        return { dataList: [], setDataList: () => {}, apiGet: "", title: "" };
    }
  })();

  const config = {
    title: title,
    apiGet: apiGet,
    createBtnOpen: false,
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
    dataOverlayContent: ({ index, onClose, data, queryKey }) => {
      return (
        <VerifyUser
          filteredData={data}
          queryKey={queryKey}
          currentIndex={index}
          onClose={onClose}
          showBtns={role === "verify" ? true : false}
        />
      );
    },
  };
  return <ContentBoxInfinite {...config} />;
};

export default UsersList;
