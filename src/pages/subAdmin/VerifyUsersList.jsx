import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/modules/VerifyUsers.module.css";
import DataCard from "../../components/DataCard";
import Loading from "../../components/Loading";
import  apiRequest  from "../../utility/apiRequest";
import { toast } from "react-toastify";
import { useAuth } from "../../routes/guards/AuthContext";

const getUserDetails = (user) => [
  { label: "Name", value: user.Name },
  { label: "Father's Name", value: user.fathersName },
  { label: "Roll Number", value: user.rollNo },
  { label: "Year Of Passing", value: user.yearOfPassing },
];

const VerifyUsersList = () => {
  const navigate = useNavigate();
  const {token} =useAuth();
  const [loading, setLoading] = useState(false);

  const [userList, setUserList] = useState([
    // {
    //   name: "Example Kumar",
    //   fatherName: "Example",
    //   rollNo: "235UCS050",
    //   yearOfPassing: "2020",
    // },
    // {
    //   name: "Example 2",
    //   fatherName: "Example 2",
    //   rollNo: "235UCS058",
    //   yearOfPassing: "2020",
    // },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiRequest({
        url: "/api/subadmin/pending-users",
        method: "GET",
        token: token,
        setLoading,
      });

      if (response.status === "success") {
        setUserList(response.data);
      } else {
        console.error("Error:", response.message);
        toast.error(`Error: ${response.message}`);
      }
    };
    fetchData();
  }, []);

  const handleClick = (index) => {
    navigate("/alumni/sub-admin/verify-user", { state: { index, userList } });
    console.log("Clicked index:", index);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Users List</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.userListBox}>
          {userList.length > 0 ? (
            userList.map((user, index) => {
              const details = getUserDetails(user);

              return (
                <div key={index} onClick={() => handleClick(index)}>
                  <DataCard dataItems={details} />
                </div>
              );
            })
          ) : (
            <p className={styles.noData}>No data found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyUsersList;
