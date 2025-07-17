import { createContext, useContext, useState } from "react";
import apiRequest from "../utility/apiRequest";
import { toast } from "react-toastify";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Sub-Admin Data
  const [verifyUsersList, setVerifyUsersList] = useState([
    {
      Name: "Ramesh Kumar",
      fathersName: "Rajesh Kumar",
      rollNo: "235UCS060",
      enrollmentNo: "ENR2020001",
      school: "SOICT",
      programme: "CSE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL:
        "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
    },
    {
      Name: "Anjali Mehta",
      fathersName: "Suresh Mehta",
      rollNo: "235UIT045",
      enrollmentNo: "ENR2020002",
      school: "SOICT",
      programme: "IT",
      country: "India",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    },
    {
      Name: "Rohan Sharma",
      fathersName: "Mahesh Sharma",
      rollNo: "235UEC072",
      enrollmentNo: "ENR2020003",
      school: "SOICT",
      programme: "ECE",
      country: "Nepal",
      yearOfPassing: "2020",
      degreeURL:
        "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
    },
    {
      Name: "Sneha Verma",
      fathersName: "Kamal Verma",
      rollNo: "235UCS033",
      enrollmentNo: "ENR2020004",
      school: "SOICT",
      programme: "CSE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
      Name: "Aditya Joshi",
      fathersName: "Dinesh Joshi",
      rollNo: "235UIT019",
      enrollmentNo: "ENR2020005",
      school: "SOICT",
      programme: "IT",
      country: "Bhutan",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      Name: "Neha Kapoor",
      fathersName: "Ravi Kapoor",
      rollNo: "235UEC056",
      enrollmentNo: "ENR2020006",
      school: "SOICT",
      programme: "ECE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      Name: "Arjun Singh",
      fathersName: "Tejpal Singh",
      rollNo: "235UCS021",
      enrollmentNo: "ENR2020007",
      school: "SOICT",
      programme: "CSE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/800px-Fronalpstock_big.jpg",
    },
    {
      Name: "Isha Chauhan",
      fathersName: "Naresh Chauhan",
      rollNo: "235UIT067",
      enrollmentNo: "ENR2020008",
      school: "SOICT",
      programme: "IT",
      country: "Bangladesh",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      Name: "Manav Desai",
      fathersName: "Prakash Desai",
      rollNo: "235UEC089",
      enrollmentNo: "ENR2020009",
      school: "SOICT",
      programme: "ECE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1549921296-3a6b5d250c18",
    },
    {
      Name: "Kritika Sinha",
      fathersName: "Vikas Sinha",
      rollNo: "235UCS050",
      enrollmentNo: "ENR2020010",
      school: "SOICT",
      programme: "CSE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/800px-Golde33443.jpg",
    },
  ]);
  const [activeUsersList, setActiveUsersList] = useState([]);

  // Admin Data
  const [alumniList, setAlumniList] = useState([
    {
      Name: "Ramesh Kumar",
      fathersName: "Rajesh Kumar",
      rollNo: "235UCS060",
      enrollmentNo: "ENR2020001",
      school: "SOICT",
      programme: "CSE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL:
        "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg",
    },
    {
      Name: "Anjali Mehta",
      fathersName: "Suresh Mehta",
      rollNo: "235UIT045",
      enrollmentNo: "ENR2020002",
      school: "SOICT",
      programme: "IT",
      country: "India",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
    },
    {
      Name: "Rohan Sharma",
      fathersName: "Mahesh Sharma",
      rollNo: "235UEC072",
      enrollmentNo: "ENR2020003",
      school: "SOICT",
      programme: "ECE",
      country: "Nepal",
      yearOfPassing: "2020",
      degreeURL:
        "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
    },
    {
      Name: "Sneha Verma",
      fathersName: "Kamal Verma",
      rollNo: "235UCS033",
      enrollmentNo: "ENR2020004",
      school: "SOICT",
      programme: "CSE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    },
    {
      Name: "Aditya Joshi",
      fathersName: "Dinesh Joshi",
      rollNo: "235UIT019",
      enrollmentNo: "ENR2020005",
      school: "SOICT",
      programme: "IT",
      country: "Bhutan",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      Name: "Neha Kapoor",
      fathersName: "Ravi Kapoor",
      rollNo: "235UEC056",
      enrollmentNo: "ENR2020006",
      school: "SOICT",
      programme: "ECE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },
    {
      Name: "Arjun Singh",
      fathersName: "Tejpal Singh",
      rollNo: "235UCS021",
      enrollmentNo: "ENR2020007",
      school: "SOICT",
      programme: "CSE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fronalpstock_big.jpg/800px-Fronalpstock_big.jpg",
    },
    {
      Name: "Isha Chauhan",
      fathersName: "Naresh Chauhan",
      rollNo: "235UIT067",
      enrollmentNo: "ENR2020008",
      school: "SOICT",
      programme: "IT",
      country: "Bangladesh",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    },
    {
      Name: "Manav Desai",
      fathersName: "Prakash Desai",
      rollNo: "235UEC089",
      enrollmentNo: "ENR2020009",
      school: "SOICT",
      programme: "ECE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL: "https://images.unsplash.com/photo-1549921296-3a6b5d250c18",
    },
    {
      Name: "Kritika Sinha",
      fathersName: "Vikas Sinha",
      rollNo: "235UCS050",
      enrollmentNo: "ENR2020010",
      school: "SOICT",
      programme: "CSE",
      country: "India",
      yearOfPassing: "2020",
      degreeURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Golde33443.jpg/800px-Golde33443.jpg",
    },
  ]);

  const [subAdminList, setSubAdminList] = useState([]);

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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
