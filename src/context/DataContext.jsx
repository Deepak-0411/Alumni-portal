import { createContext, useContext, useState } from "react";
import apiRequest from "../utility/apiRequest";
import { toast } from "react-toastify";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Sub-Admin Data
  const [verifyUsersList, setVerifyUsersList] = useState([]);
  const [activeUsersList, setActiveUsersList] = useState([]);
  const [approvedUsersList, setApprovedUsersList] = useState([]);

  // Admin Data
  const [alumniList, setAlumniList] = useState([]);
  const [subAdminList, setSubAdminList] = useState([]);

  // User Data
  const [currentUser, setCurrentUser] = useState([]); // this is for all i.e user/admin/subAdmin
  const [userLoading, setUserLoading] = useState(false);
  const [card, setCard] = useState([]);

  // School & branch Data
  const [schoolData, setSchoolData] = useState([]);

  // others
  const [events, setEvents] = useState([]);
  const [cardLoaded, setCardLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  // functions
  const clearAll = () => {
    setVerifyUsersList([]);
    setActiveUsersList([]);
    setApprovedUsersList([]);
    setAlumniList([]);
    setSubAdminList([]);
    setCurrentUser([]);
    setCard([]);
  };

  const fetchUser = async (forUser = "user") => {
    const url = (() => {
      switch (forUser) {
        case "user":
          return "/api/alumni/profile";
        case "subAdmin":
          return "/api/subadmin/profile";
        case "superAdmin":
          return "/api/root/profile";
        default:
          return null;
      }
    })();

    const response = await apiRequest({
      url: url,
      setLoading: setUserLoading,
    });
    // console.log(response);
    setUserLoaded(true);

    if (response.status === "success") {
      if (response?.data) {
        setCurrentUser(response.data?.entries);
      }
    } else {
      console.error("Error:", response.message);
      toast.error(`Failed to fetch user`);
    }
  };

  const fetchCard = async () => {
    const response = await apiRequest({
      url: "/api/alumni/profile/card",
      setLoading: setUserLoading,
    });

    setCardLoaded(true);
    if (response.status === "success") {
      if (response?.data) {
        setCard(response.data?.entries);
      }
    } else {
      console.error("Error:", response.message);
      // toast.error(`Failed to fetch Card`);
    }
  };

  const fetchSchoolData = async () => {
    const response = await apiRequest({
      url: `/api/data/filter `,
    });

    if (response.status === "success") {
      if (response?.data) {
        setSchoolData(response.data);
      }
    } else {
      console.error("Error:", response.message);
      toast.error(`Error: Failed to fetch school list.`);
    }
  };

  const fetchEvents = async (setLoading) => {
    const response = await apiRequest({
      url: `/api/events/`,
      setLoading,
    });

    if (response.status === "success") {
      if (response?.data.entries) {
        setEvents(response.data.entries);
      }
    } else {
      console.error("Error:", response.message);
      toast.error(`Failed to load events`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        verifyUsersList,
        setVerifyUsersList,
        activeUsersList,
        approvedUsersList,
        setApprovedUsersList,
        setActiveUsersList,
        alumniList,
        setAlumniList,
        subAdminList,
        setSubAdminList,
        currentUser,
        setCurrentUser,
        schoolData,
        setSchoolData,
        events,
        setEvents,
        userLoading,
        setUserLoading,
        card,
        setCard,
        cardLoaded,
        userLoaded,

        // Functions
        clearAll,
        fetchUser,
        fetchCard,
        fetchSchoolData,
        fetchEvents,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
