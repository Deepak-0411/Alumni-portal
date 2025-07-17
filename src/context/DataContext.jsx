import { createContext, useContext, useState } from "react";
import apiRequest from "../utility/apiRequest";
import { toast } from "react-toastify";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Sub-Admin Data
  const [verifyUsersList, setVerifyUsersList] = useState([
    {
      Name: "Deepak Kumar",
      fathersName: "Example",
      rollNo: "235UCS060",
      schoolName:"SOICT",
      yearOfPassing: "2020",
    },
    {
      Name: "Example 2",
      fathersName: "Example 2",
      rollNo: "235UCS058",
      yearOfPassing: "2020",
    },
    {
      Name: "Example Kumar",
      fathersName: "Example",
      rollNo: "235UCS050",
      yearOfPassing: "2020",
    },
    {
      Name: "Example 2",
      fathersName: "Example 2",
      rollNo: "235UCS058",
      yearOfPassing: "2020",
    },
    {
      Name: "Example Kumar",
      fathersName: "Example",
      rollNo: "235UCS050",
      yearOfPassing: "2020",
    },
    {
      Name: "Example 2",
      fathersName: "Example 2",
      rollNo: "235UCS058",
      yearOfPassing: "2020",
    },
    {
      Name: "Example Kumar",
      fathersName: "Example",
      rollNo: "235UCS050",
      yearOfPassing: "2020",
    },
    {
      Name: "Example 2",
      fathersName: "Example 2",
      rollNo: "235UCS058",
      yearOfPassing: "2020",
    },
    {
      Name: "Example Kumar",
      fathersName: "Example",
      rollNo: "235UCS050",
      yearOfPassing: "2020",
    },
    {
      Name: "Example 2",
      fathersName: "Example 2",
      rollNo: "235UCS058",
      yearOfPassing: "2020",
    },
    {
      Name: "Example Kumar",
      fathersName: "Example",
      rollNo: "235UCS050",
      yearOfPassing: "2020",
    },
    {
      Name: "Example 2",
      fathersName: "Example 2",
      rollNo: "235UCS058",
      yearOfPassing: "2020",
    },
  ]);
  const [activeUsersList, setActiveUsersList] = useState([]);

  // Admin Data

  return (
    <DataContext.Provider
      value={{
        verifyUsersList,
        setVerifyUsersList,
        activeUsersList,
        setActiveUsersList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
