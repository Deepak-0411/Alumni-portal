import { createContext, useContext, useState } from "react";
import apiRequest from "../utility/apiRequest";
import { toast } from "react-toastify";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Sub-Admin Data
  const [verifyUsersList, setVerifyUsersList] = useState([]);
  const [activeUsersList, setActiveUsersList] = useState([]);

  // Admin Data
  const [alumniList, setAlumniList] = useState([]);
  const [subAdminList, setSubAdminList] = useState([]);

  // User Data
  const [currentUser, setCurrentUser] = useState([]);

  // School & branch Data
  const [schoolData, setSchoolData] = useState([]);

  return (
    <DataContext.Provider
      value={{
        verifyUsersList,
        setVerifyUsersList,
        activeUsersList,
        setActiveUsersList,
        alumniList,
        setAlumniList,
        subAdminList,
        setSubAdminList,
        currentUser,
        setCurrentUser,
        schoolData,
        setSchoolData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
