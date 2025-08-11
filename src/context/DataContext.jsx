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
  const [currentUser, setCurrentUser] = useState([]);
  const [userLoading, setUserLoading] = useState(false);

  // School & branch Data
  const [schoolData, setSchoolData] = useState([]);

  // others
  const [events, setEvents] = useState([]);

  // functions

  const fetchUser = async () => {
    const response = await apiRequest({
      url: `/api/alumni/profile`,
      setLoading: setUserLoading,
    });

    if (response.status === "success") {
      if (response?.data) {
        setCurrentUser(response.data.entries);
      }
    } else {
      console.error("Error:", response.message);
      toast.error(`Failed to fetch user`);
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

        // Functions
        fetchUser,
        fetchSchoolData,
        fetchEvents,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
