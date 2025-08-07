import { useData } from "../../context/DataContext";
import ContentBox from "../../layouts/ContentBox";

const CreateEvents = () => {
  const { events, setEvents } = useData();

  const config = {
    createBtnOpen: true,
    showToggleBtn: false,
    title: "Events",
    apiGet: `/api/events/`,
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
      imageURL: { value: "", placeholder: "Image", role: "file" },
      tags: { value: "", placeholder: "tags", role: "text" },
    },
    tableHeading: ["Title", "Date", "Venue", "Description"],
    tableColumn: ["title", "date", "venue", "description"],
    dataList: events,
    setDataList: setEvents,
    // dataOverlayContent: ({ index, onClose }) => {
      // <VerifyUsers
      //   usersList={alumniList}
      //   setUsersList={setAlumniList}
      //   currentIndex={index}
      //   onClose={onClose}
      // />
    // },
  };

  return <ContentBox {...config} />;
};
export default CreateEvents;
