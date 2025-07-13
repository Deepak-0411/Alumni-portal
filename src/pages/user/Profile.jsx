import { useEffect, useState } from "react";
import DP from "../../assets/user.png";
import styles from "../../styles/modules/user/Profile.module.css";
import DataCard from "../../components/DataCard/DataCard";

const Profile = () => {
  const [formData, setFormData] = useState({
    Name: "Mr. Example",
    Fathername: "Example",
    dob: "12/12/2012",
    phoneNo: "1234567890",
    email: "example@gmail.com",
    enrollmentNo: "222211244",
    rollNo: "235UCS050",
    yearOfPassing: "2027",
    school: "School Of ICT",
    programme: "B.Tech",
    country: "",
    dp: "",
  });

  const profileDataItems = [{ label: "Name", value: formData.Name }];

  const personalDataItems = [
    { label: "Date Of Birth", value: formData.dob },
    { label: "Father's Name", value: formData.Fathername },
  ];

  const contactDataItems = [
    { label: "Phone Number", value: formData.phoneNo },
    { label: "E-mail", value: formData.email },
  ];

  const collegeInfoItems = [
    { label: "Enrollment Number", value: formData.enrollmentNo },
    { label: "Roll Number", value: formData.rollNo },
    { label: "Year Of Passing", value: formData.yearOfPassing },
    { label: "School", value: formData.school },
    { label: "Programme", value: formData.programme },
    { label: "Country", value: formData.country },
  ];

  const socialMediaItems = [
    { label: "X", value: formData.x },
    { label: "Insta", value: formData.insta },
    { label: "LinkedIn", value: formData.linkedIn },
    { label: "Github", value: formData.gitHub },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.editBtn}>
        <span>{editBtn}</span>
      </div>

      <DataCard
        heading="Profile Data"
        image={formData.dp || DP}
        dataItems={profileDataItems}
      />
      <DataCard heading="Personal Data" dataItems={personalDataItems} />
      <DataCard heading="Contact" dataItems={contactDataItems} />
      <DataCard heading="College Info" dataItems={collegeInfoItems} />
      <DataCard heading="Social Media" dataItems={socialMediaItems} />
    </div>
  );
};
export default Profile;

const editBtn = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="25"
    viewBox="0 0 26 25"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.333496 6.07125C0.333496 4.46105 0.973144 2.91681 2.11172 1.77823C3.2503 0.639648 4.79455 0 6.40475 0H12.8335C13.165 0 13.483 0.131696 13.7174 0.366116C13.9518 0.600537 14.0835 0.918479 14.0835 1.25C14.0835 1.58152 13.9518 1.89946 13.7174 2.13388C13.483 2.3683 13.165 2.5 12.8335 2.5H6.40475C5.45759 2.5 4.54923 2.87626 3.87949 3.546C3.20975 4.21573 2.8335 5.1241 2.8335 6.07125V18.9288C2.8335 19.8759 3.20975 20.7843 3.87949 21.454C4.54923 22.1237 5.45759 22.5 6.40475 22.5H19.2622C20.2094 22.5 21.1178 22.1237 21.7875 21.454C22.4572 20.7843 22.8335 19.8759 22.8335 18.9288V12.5C22.8335 12.1685 22.9652 11.8505 23.1996 11.6161C23.434 11.3817 23.752 11.25 24.0835 11.25C24.415 11.25 24.733 11.3817 24.9674 11.6161C25.2018 11.8505 25.3335 12.1685 25.3335 12.5V18.9288C25.3335 20.5389 24.6939 22.0832 23.5553 23.2218C22.4167 24.3604 20.8724 25 19.2622 25H6.40475C4.79455 25 3.2503 24.3604 2.11172 23.2218C0.973144 22.0832 0.333496 20.5389 0.333496 18.9288V6.07125Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.7548 14.0238L13.9986 15.6863L12.7073 13.545L15.4636 11.8825L15.4673 11.88C15.573 11.8164 15.6704 11.74 15.7573 11.6525L22.0198 5.35751C22.0826 5.29426 22.143 5.2288 22.2011 5.16126C22.6148 4.67876 23.2273 3.72376 22.4861 2.97876C21.8598 2.34876 20.9623 2.94376 20.3811 3.45501C20.2252 3.59246 20.0751 3.73633 19.9311 3.88626L19.8886 3.92876L13.7136 10.135C13.567 10.2808 13.4521 10.4552 13.3761 10.6475L12.3461 13.2388C12.3266 13.2875 12.3229 13.3412 12.3356 13.3922C12.3483 13.4431 12.3767 13.4888 12.4168 13.5227C12.457 13.5566 12.5067 13.577 12.5591 13.581C12.6115 13.585 12.6625 13.5724 12.7073 13.545L13.9986 15.6863C11.7423 17.0463 9.0486 14.7613 10.0236 12.3138L11.0548 9.72376C11.2556 9.21763 11.5576 8.75782 11.9423 8.37251L18.1161 2.16501L18.1523 2.12876C18.3361 1.94126 18.9536 1.30876 19.7023 0.853756C20.1111 0.607506 20.7636 0.281256 21.5698 0.218756C22.4948 0.145006 23.4823 0.436255 24.2573 1.21501C24.8505 1.80099 25.2236 2.57356 25.3136 3.40251C25.3755 4.04862 25.2768 4.70003 25.0261 5.29876C24.6636 6.19501 24.0586 6.85376 23.7923 7.12001L17.5298 13.415C17.2965 13.6492 17.0382 13.8521 16.7548 14.0238ZM22.3211 5.11626C22.3211 5.11626 22.3161 5.12001 22.3048 5.12376L22.3211 5.11626Z"
      fill="black"
    />
  </svg>
);
