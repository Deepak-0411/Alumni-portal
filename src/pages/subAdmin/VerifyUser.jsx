import { useState, useMemo, useEffect } from "react";
import styles from "../../styles/modules/subAdmin/VerifyUsers.module.css";
import DataCard from "../../components/DataCard/DataCard";
import Overlay from "../../components/Overlay/Overlay";
import { toast } from "react-toastify";
import apiRequest from "../../utility/apiRequest";
import Loading from "../../components/Spinner/Loading";
import fallbackImage from "../../assets/imgNotFound.jpg";

// ----- Helper Functions -----
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

const VerifyUsersList = ({
  currentIndex,
  usersList,
  setUsersList,
  onClose,
}) => {
  const [index, setIndex] = useState(currentIndex);
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showOverlay) {
        if (e.key === "Escape") {
          setShowOverlay(false);
        }
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          handleIndexChange(-1);
          break;
        case "ArrowRight":
          handleIndexChange(1);
          break;
        case "a":
          verifyUser("accept");
          break;
        case "r":
          verifyUser("reject");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, usersList, showOverlay, currentUser]);

  const currentUser = useMemo(
    () => usersList[index] || null,
    [usersList, index]
  );

  const imageURL = currentUser?.degreeURL || fallbackImage;

  const userDetails = useMemo(
    () => getUserDetails(currentUser || {}),
    [currentUser]
  );
  const collegeDetails = useMemo(
    () => getCollegeDetails(currentUser || {}),
    [currentUser]
  );

  const handleImageClick = () => setShowOverlay(true);
  const handleCloseOverlay = () => setShowOverlay(false);

  const handleIndexChange = (direction) => {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < usersList.length) {
      setIndex(newIndex);
    }
  };

  const verifyUser = async (type) => {
    if (!currentUser) return;

    const enrollmentNo = currentUser.enrollmentNo;
    if (!enrollmentNo) return toast.error("Missing enrollment number.");

    const requestConfig = {
      accept: {
        method: "POST",
        url: `/api/subadmin/approve-user?enrollmentNo=${enrollmentNo}`,
      },
      reject: {
        method: "DELETE",
        url: `/api/subadmin/reject-user?enrollmentNo=${enrollmentNo}`,
      },
    };

    const { method, url } = requestConfig[type] || {};

    const response = await apiRequest({ url, method, token, setLoading });

    if (response.status === "success") {
      toast.success(`Marked as ${type}`);

      const updatedUserList = usersList.filter((_, i) => i !== index);
      setUsersList(updatedUserList);

      if (updatedUserList.length === 0) {
        onClose();
        return;
      }

      // Adjust index if needed
      setIndex((prevIndex) => Math.min(prevIndex, updatedUserList.length - 1));
    } else {
      console.error("Error:", response.message);
      toast.error(`Error: ${response.message}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userListBox}>
        <div className={styles.imageBox}>
          <img
            className={styles.image}
            src={imageURL}
            alt="Degree Picture"
            onClick={handleImageClick}
          />
        </div>
        <DataCard dataItems={userDetails} heading="Personal Details" />
        <DataCard dataItems={collegeDetails} heading="College Details" />
      </div>

      {showOverlay && (
        <Overlay imageUrl={imageURL} onClose={handleCloseOverlay} />
      )}

      {/* Navigation & Action Buttons */}
      <div className={styles.btnsContainer}>
        <button
          className={styles.backBtn}
          disabled={index === 0}
          onClick={() => handleIndexChange(-1)}
        >
          &lt;- Back
        </button>

        <button
          className={styles.rejectBtn}
          onClick={() => verifyUser("reject")}
          disabled={loading}
        >
          {loading ? <Loading color="white" size="small" /> : "Reject"}
        </button>

        <button
          className={styles.acceptBtn}
          onClick={() => verifyUser("accept")}
          disabled={loading}
        >
          {loading ? <Loading color="white" size="small" /> : "Accept"}
        </button>

        <button
          className={styles.nextBtn}
          disabled={index >= usersList.length - 1}
          onClick={() => handleIndexChange(1)}
        >
          Next -&gt;
        </button>
      </div>
    </div>
  );
};

export default VerifyUsersList;
