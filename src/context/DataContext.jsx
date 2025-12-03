import { createContext, useContext, useState } from "react";
import apiRequest from "../utility/apiRequest";
import { toast } from "react-toastify";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [verifyUsersList, setVerifyUsersList] = useState([]);
  const [activeUsersList, setActiveUsersList] = useState([]);
  const [approvedUsersList, setApprovedUsersList] = useState([]);
  const [alumniList, setAlumniList] = useState([]);
  const [subAdminList, setSubAdminList] = useState([]);

  // User Data
  const [currentUser, setCurrentUser] = useState([]); // Keep as array
  const [userLoading, setUserLoading] = useState(false);
  const [card, setCard] = useState([]);
  const [schoolData, setSchoolData] = useState([]);
  const [events, setEvents] = useState([]);
  const [cardLoaded, setCardLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);

  const clearAll = () => {
    setVerifyUsersList([]);
    setActiveUsersList([]);
    setApprovedUsersList([]);
    setAlumniList([]);
    setSubAdminList([]);
    setCurrentUser([]);
    setCard([]);
    setCardLoaded(false);
    setUserLoaded(false);
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
    setUserLoaded(false);

    const response = await apiRequest({
      url: url,
      setLoading: setUserLoading,
    });

    setUserLoaded(true);

    if (response.status === "success") {
      if (response?.data?.entries) {
        const data = response.data.entries;

        setCurrentUser(data);
      }
    } else {
      console.error("Error:", response.message);
    }
  };

  const fetchCard = async () => {
    setCardLoaded(false);
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
      // console.error("Error:", response.message);
      if (!response.message === "No alumni card found") {
        toast.error(`Failed to fetch Card`);
      }
    }
  };

  const fetchSchoolData = async () => {
    const response = await apiRequest({
      url: `/api/school`,
    });

    if (response.status === "success") {
      if (response?.data?.entries) {
        setSchoolData(response.data.entries);
      } else if (Array.isArray(response?.data)) {
        setSchoolData(response.data);
      }
    } else {
      // console.error("Error:", response.message);
      toast.error(`Error: Failed to fetch school list.`);
    }
  };

  const fetchEvents = async (setLoading) => {
    const response = await apiRequest({
      url: `/api/events/`,
      setLoading,
    });

    if (response.status === "success") {
      if (response?.data?.entries) {
        setEvents(response.data.entries);
      }
    } else {
      // console.error("Error:", response.message);
      toast.error(`Failed to load events`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        verifyUsersList,
        setVerifyUsersList,
        activeUsersList,
        setActiveUsersList,
        approvedUsersList,
        setApprovedUsersList,
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
