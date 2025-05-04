import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/modules/VerifyUsers.module.css";
import DataCard from "../../components/DataCard";
import ImageOverlay from "../../components/ImageOverlay";

// Helper functions
const getUserDetails = (user) => [
  { label: "Name", value: user.name || "-" },
  { label: "Father's Name", value: user.fatherName || "-" },
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

  const { state } = useLocation();
  const [userList] = useState(state?.userList || []);
  const [index, setIndex] = useState(state?.index || 0);
  const [showOverlay, setShowOverlay] = useState(false);

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
        <button className={styles.rejectBtn}>reject</button>
        <button className={styles.incorrectBtn}>incorrect information</button>
        <button className={styles.acceptBtn}>accept</button>
        <button
          className={styles.nextBtn}
          disabled={index == userList.length-1}
          onClick={handleNext}
        >
          next -&gt;{" "}
        </button>
      </div>
    </div>
  );
};

export default VerifyUsersList;
