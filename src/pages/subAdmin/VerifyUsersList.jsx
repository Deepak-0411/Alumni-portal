import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/modules/VerifyUsers.module.css";
import DataCard from "../../components/DataCard";

const getUserDetails = (user) => [
  { label: "Name", value: user.name },
  { label: "Father's Name", value: user.fatherName },
  { label: "Roll Number", value: user.rollNo },
  { label: "Year Of Passing", value: user.yearOfPassing },
];

const VerifyUsersList = () => {
  const navigate = useNavigate();

  const [userList, setUserList] = useState([
    {
      name: "Example Kumar",
      fatherName: "Example",
      rollNo: "235UCS050",
      yearOfPassing: "2020",
    },
    {
      name: "Example 2",
      fatherName: "Example 2",
      rollNo: "235UCS058",
      yearOfPassing: "2020",
    },
    
  ]);

  const handleClick = (index) => {
    navigate("/alumni/sub-admin/verify-user", { state: { index, userList } });
    console.log("Clicked index:", index);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Users List</h2>
      <div className={styles.userListBox}>
        {userList.map((user, index) => {
          const details = getUserDetails(user);

          return (
            <div key={index} onClick={() => handleClick(index)}>
              <DataCard dataItems={details} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerifyUsersList;
