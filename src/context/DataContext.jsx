import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [verifyUsersList, setVerifyUsersList] = useState([]);
  const [activeUsersList, setActiveUsersList] = useState([]);
  const [approvedUsersList, setApprovedUsersList] = useState([]);
  const [alumniList, setAlumniList] = useState([]);
  const [subAdminList, setSubAdminList] = useState([]);

  // User Data

  const clearAll = () => {
    setVerifyUsersList([]);
    setActiveUsersList([]);
    setApprovedUsersList([]);
    setAlumniList([]);
    setSubAdminList([]);
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

        clearAll,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
