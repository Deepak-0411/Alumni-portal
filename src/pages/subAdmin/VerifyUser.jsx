import { useState, useMemo, useEffect } from "react";
import styles from "../../styles/modules/subAdmin/VerifyUsers.module.css";
import DataCard from "../../components/DataCard/DataCard";
import Overlay from "../../components/Overlay/Overlay";
import { toast } from "react-toastify";
import apiRequest from "../../utility/apiRequest";
import { getNextIndex } from "../../utility/navigateIndex";
import Loading from "../../components/Spinner/Loading";
import fallbackImage from "../../assets/imgNotFound.jpg";
import useIndexNavigation from "../../hooks/useIndexNavigation.js";
import { removeFromStateByKey } from "../../utility/removeFromStateByKey.js";

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
  currentIndex=0,
  filteredData=[],
  setUsersList,
  onClose,
}) => {
  const [index, setIndex] = useState(currentIndex);
  const [showOverlay, setShowOverlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);  

  const currentUser = useMemo(
    () => filteredData[index] || null,
    [filteredData, index]
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

  useEffect(() => {
    setImageLoaded(false);
  }, [imageURL]);

  useEffect(() => {
    if (filteredData.length === 0) {
      onClose();
    }
  }, [filteredData, onClose]);

  useIndexNavigation({
    handleIndexChange: handleIndexChange,
    disabled: showOverlay,
  });

  const handleImageClick = () => setShowOverlay(true);
  const handleCloseOverlay = () => setShowOverlay(false);

  function handleIndexChange(direction) {
    const newIndex = getNextIndex(index, filteredData.length, direction);
    setIndex(newIndex);
  }

  const verifyUser = async (type) => {
    if (!currentUser) return;
    const enrollmentNo = currentUser.enrollmentNo;

    // just checking the functionality

    setLoading(true);

    // Simulate delay
    setTimeout(() => {
      setLoading(false);
       removeFromStateByKey([setUsersList],"enrollmentNo",enrollmentNo);
       console.log("enrollmentNo",enrollmentNo);
       
      setIndex((prevIndex) => Math.max(0, prevIndex - 1));

      toast.success(`Marked as ${type}`);
    }, 500);

    // actual code

    // if (!enrollmentNo) return toast.error("Missing enrollment number.");

    // const requestConfig = {
    //   accept: {
    //     method: "POST",
    //     url: `/api/subadmin/approve-user?enrollmentNo=${enrollmentNo}`,
    //   },
    //   reject: {
    //     method: "DELETE",
    //     url: `/api/subadmin/reject-user?enrollmentNo=${enrollmentNo}`,
    //   },
    // };

    // const { method, url } = requestConfig[type] || {};

    // const response = await apiRequest({ url, method, setLoading });

    // if (response.status === "success") {
    //   toast.success(`Marked as ${type}`);
    //   removeFromStateByKey([setUsersList], "enrollmentNo", enrollmentNo);
    //   setIndex((prevIndex) => Math.max(0, prevIndex - 1));
    // } else {
    //   console.error("Error:", response.message);
    //   toast.error(`Error: ${response.message}`);
    // }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userListBox}>
        <div className={styles.imageBox}>
          <img
            className={styles.image}
            src={imageURL}
            alt="Degree Picture"
            onLoad={() => setImageLoaded(true)}
            onClick={handleImageClick}
          />
          {/* Loader overlay */}
          {!imageLoaded && (
            <div className={styles.imageLoaderOverlay}>
              <Loading />
            </div>
          )}
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
          disabled={index >= filteredData.length - 1}
          onClick={() => handleIndexChange(1)}
        >
          Next -&gt;
        </button>
      </div>
    </div>
  );
};

export default VerifyUsersList;
