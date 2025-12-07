import ContentBoxNormal from "../../layouts/ContentBoxNormal";

const CreateEvents = () => {
  const config = {
    title: "Events",
    apiGet: `/api/events/`,
    createBtnOpen: true,
    showToggleBtn: false,
    showDeleteBtn: true,
    apiToggle: `/api/panel/toggle/`,
    apiEndPointCreate: `/api/events/`,
    searchBoxPlaceholder: "Search by name.",
    idKey: "username",
    nameKey: "name",
    addText: "Create a Event",
    formFields: {
      title: { value: "", placeholder: "Title", role: "text" },
      description: { value: "", placeholder: "Description", role: "text" },
      date: { value: "", placeholder: "Date", role: "date" },
      venue: { value: "", placeholder: "Venue", role: "text" },
    },
    tableHeading: ["Title", "Date", "Venue", "Description"],
    tableColumn: ["title", "date", "venue", "description"],
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
export default CreateEvents;
