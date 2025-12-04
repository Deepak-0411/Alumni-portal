import { useState, useMemo, useEffect } from "react";
import styles from "../../styles/modules/subAdmin/VerifyUsers.module.css";
import DataCard from "../../components/DataCard/DataCard.jsx";
import Overlay from "../../components/Overlay/Overlay.jsx";
import { toast } from "react-toastify";
import apiRequest from "../../apis/apiRequest.js";
import baseURL from "../../utility/baseURL.js";
import { getNextIndex } from "../../utility/navigateIndex.js";
import Loading from "../../components/Spinner/Loading.jsx";
import fallbackImage from "../../assets/imgNotFound.webp";
import useIndexNavigation from "../../hooks/useIndexNavigation.js.js";
import { removeFromStateByKey } from "../../utility/removeFromStateByKey.js";
import ConfirmationBox from "../../components/ConfirmationBox/ConfirmationBox.jsx";
import { useMutation } from "@tanstack/react-query";

// ----- Helper Functions -----
const getUserDetails = (user) => [
  { label: "Name", value: user.alumniName || "-" },
  { label: "Father's Name", value: user.fatherName || "-" },
];

const getCollegeDetails = (user) => [
  { label: "Enrollment Number", value: user.enrollmentNo || "-" },
  { label: "Roll Number", value: user.rollNo || "-" },
  { label: "Year Of Passing", value: user.yearOfPassing || "-" },
  { label: "School", value: user.schoolName || "-" },
  { label: "Programme", value: user.programme || "-" },
  { label: "Branch", value: user.branch || "-" },
];

const VerifyUser = ({
  currentIndex = 0,
  filteredData = [],
  setUsersList,
  onClose,
  showBtns = false,
}) => {
  const [index, setIndex] = useState(currentIndex);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showRejectOverlay, setShowRejectOverlay] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentUser = useMemo(
    () => filteredData[index] || null,
    [filteredData, index]
  );
  const imageURL = currentUser?.degreeImg
    ? baseURL + currentUser.degreeImg
    : fallbackImage;

  const userDetails = useMemo(
    () => getUserDetails(currentUser || {}),
    [currentUser]
  );
  const collegeDetails = useMemo(
    () => getCollegeDetails(currentUser || {}),
    [currentUser]
  );

  useEffect(() => setImageLoaded(false), [imageURL]);

  useEffect(() => {
    if (filteredData.length === 0) onClose();
  }, [filteredData, onClose]);

  useIndexNavigation({
    handleIndexChange,
    disabled: showOverlay || loading,
  });

  function handleIndexChange(direction) {
    const newIndex = getNextIndex(index, filteredData.length, direction);
    setIndex(newIndex);
  }

  const handleImageClick = () => setShowOverlay(true);
  const handleCloseOverlay = () => setShowOverlay(false);

  const { mutate, isPending: loading } = useMutation({
    mutationFn: async ({ method, url, body }) => {
      return await apiRequest({
        url,
        method,
        body,
      });
    },
    onSuccess: () => {
      toast.success(`Marked as ${type}`);
      removeFromStateByKey([setUsersList], "enrollmentNo", enrollmentNo);
      setIndex((prev) => Math.max(0, prev - 1));
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const verifyUser = async (type) => {
    if (!currentUser?.enrollmentNo)
      return toast.error("Missing enrollment number.");

    const enrollmentNo = currentUser.enrollmentNo;
    setShowRejectOverlay(false);
    const requestConfig = {
      accept: {
        method: "POST",
        url: `/api/approval/approve-user/${enrollmentNo}`,
      },
      reject: {
        method: "DELETE",
        url: `/api/approval/reject-user/${enrollmentNo}`,
        body: { rejectReason: rejectionReason },
      },
    };

    const { method, url, body } = requestConfig[type];

    mutate({ method, url, body });

    setRejectionReason("");
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

      {showRejectOverlay && (
        <Overlay
          onClose={() => {
            setShowRejectOverlay(false);
            setRejectionReason("");
          }}
        >
          <ConfirmationBox
            message="Please specify a reason to reject."
            showInput
            inputPlaceholder="Reason..."
            inputValue={rejectionReason}
            setInputValue={setRejectionReason}
            confirmDisabled={!rejectionReason.trim()}
            onConfirm={() => verifyUser("reject")}
            onCancel={() => {
              setShowRejectOverlay(false);
              setRejectionReason("");
            }}
            action="Reject"
          />
        </Overlay>
      )}

      {/* Navigation & Action Buttons */}
      <div className={styles.btnsContainer}>
        <button
          className={styles.backBtn}
          disabled={index === 0 || loading}
          onClick={() => handleIndexChange(-1)}
        >
          &lt;- Back
        </button>

        {showBtns && (
          <>
            <button
              className={styles.rejectBtn}
              onClick={() => setShowRejectOverlay(true)}
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
          </>
        )}

        <button
          className={styles.nextBtn}
          disabled={index >= filteredData.length - 1 || loading}
          onClick={() => handleIndexChange(1)}
        >
          Next -&gt;
        </button>
      </div>
    </div>
  );
};

export default VerifyUser;
