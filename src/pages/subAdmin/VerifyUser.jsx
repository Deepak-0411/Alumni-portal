import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/modules/VerifyUsers.module.css";
import DataCard from "../../components/DataCard";
import ImageOverlay from "../../components/ImageOverlay";
import { toast } from "react-toastify";
import { useAuth } from "../../routes/guards/AuthContext";
import apiRequest from "../../utility/apiRequest";
import Loading from "../../components/Loading";

// Helper functions
const getUserDetails = (user) => [
  { label: "Name", value: user.Name || "-" },
  { label: "Father's Name", value: user.fathersName || "-" },
];

const getCollegeDetails = (user) => [
  { label: "Enrollment Number", value: user.enrollmentNo || "-" },
  { label: "Roll Number", value: user.rollNo || "-" },
  { label: "Year Of Passing", value: user.yearOfPassing || "-" },
  { label: "School", value: user.school || "-" },
  { label: "Programme", value: user.programme || "-" },
  { label: "Country", value: user.country || "-" },
];

const fallbackImage =
  "https://images.pexels.com/photos/355465/pexels-photo-355465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const VerifyUsersList = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const { state } = useLocation();
  const [userList, setUserList] = useState(state?.userList || []);
  const [index, setIndex] = useState(state?.index || 0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentUser = userList[index];
  const userDetails = currentUser ? getUserDetails(currentUser) : [];
  const collegeDetails = currentUser ? getCollegeDetails(currentUser) : [];
  const imageURL = currentUser?.degreeURL || fallbackImage;

  const handleImageClick = () => setShowOverlay(true);
  const handleCloseOverlay = () => setShowOverlay(false);

  useEffect(() => {
    if (!state || !state.userList || state.userList.length === 0) {
      navigate("/alumni/sub-admin/verify-users-list");
    }
  }, [state, navigate]);

  const handleBack = () => {
    if (index > 0) {
      const newIndex = index - 1;
      setIndex(newIndex);
    }
  };
  const handleNext = () => {
    if (index < userList.length - 1) {
      const newIndex = index + 1;
      setIndex(newIndex);
    }
  };
  const handleUser = async (requestType) => {
    let url = "";
    let method = "";
    const enrollmentNo = currentUser?.enrollmentNo || null;
  
    if (requestType === "accept") {
      url = `/api/subadmin/approve-user?enrollmentNo=${enrollmentNo}`;
      method = "POST";
    } else if (requestType === "reject") {
      url = `/api/subadmin/reject-user?enrollmentNo=${enrollmentNo}`;
      method = "DELETE";
    } else if (requestType === "incorrect information") {
      url = "";
    }
  
    const response = await apiRequest({
      url,
      method,
      token,
      setLoading,
    });
  
    if (response.status === "success") {
      toast.success(`Marked as ${requestType}`);
  
      if (requestType === "reject" || requestType === "accept") {
        const updatedUserList = userList.filter((user, userIndex) => userIndex !== index);
        setUserList(updatedUserList);
  
        if (updatedUserList.length === 0) {
          navigate("/alumni/sub-admin/verify-users-list");
          return;
        }
  
        // Adjust index if current index is now out of bounds
        if (index >= updatedUserList.length) {
          setIndex(updatedUserList.length - 1);
        }
      }
    } else {
      console.error("Error:", response.message);
      toast.error(`Error: ${response.message}`);
    }
  };
  

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Verify User</h2>
      <div className={styles.userListBox}>
        <div className={styles.imageBox}>
          <img
            className={styles.image}
            src={imageURL}
            alt="Degree Picture"
            onClick={handleImageClick}
          />
        </div>
        {currentUser && (
          <>
            <DataCard dataItems={userDetails} heading="Personal Details" />
            <DataCard dataItems={collegeDetails} heading="College Details" />
          </>
        )}
      </div>

      {showOverlay && (
        <ImageOverlay imageUrl={imageURL} onClose={handleCloseOverlay} />
      )}
      <div className={styles.btnsContainer}>
        <button
          className={styles.backBtn}
          disabled={index == 0}
          onClick={handleBack}
        >
          {" "}
          &lt;- back{" "}
        </button>
        <button
          className={styles.rejectBtn}
          onClick={() => handleUser("reject")}
          disabled={loading}
        >
          {loading ? <Loading color="white" size={"small"} /> : "reject"}
        </button>
        <button
          className={styles.incorrectBtn}
          onClick={() => handleUser("incorrect information")}
          disabled={loading}
        >
          {loading ? (
            <Loading color="white" size="small" />
          ) : (
            "rejincorrect informationect"
          )}
        </button>
        <button
          className={styles.acceptBtn}
          onClick={() => handleUser("accept")}
          disabled={loading}
        >
          {loading ? <Loading color="white" size="small" /> : "accept"}
        </button>
        <button
          className={styles.nextBtn}
          disabled={index == userList.length - 1}
          onClick={handleNext}
        >
          next -&gt;{" "}
        </button>
      </div>
    </div>
  );
};

export default VerifyUsersList;
