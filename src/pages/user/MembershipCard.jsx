import { useEffect, useState } from "react";
import DP from "../../assets/user.png";
import Logo from "../../assets/GBULOGO.png";

import styles from "../../styles/modules/user/MembershipCard.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useData } from "../../context/DataContext";

function MembershipCardSkeleton(data) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.leftCol}>
          <Skeleton circle height={80} width={80} />
          <Skeleton height={28} width={100} />
        </div>
        <div className={styles.rightCol}>
          {data.map((section, index) => {
            const [title, content] = Object.entries(section)[0];
            return (
              <div className={styles.box} key={index}>
                <h2 className={styles.heading}>{title}</h2>
                <div className={styles.innerBox}>
                  {Object.entries(content).map(([subHeading, value]) => (
                    <div className={styles.subBox} key={subHeading}>
                      <p className={styles.subHeading}>{subHeading}</p>
                      <Skeleton height={28} width={"100%"} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const MembershipCard = () => {
  const {
    fetchUser,
    fetchCard,
    userLoading: loading,
    currentUser,
    card,
  } = useData();

  useEffect(() => {
    if (!Array.isArray(currentUser) || currentUser.length === 0) {
      fetchUser();
    }
    if (!Array.isArray(card) || card.length === 0) {
      fetchCard();
      
    }
  }, []);
  const user = card[0];
  

  const data = [
    {
      "Personal Information": {
        DOB: user?.["dob"] || "-",
        "Phone No.": user?.["phoneNo"] || "-",
      },
    },
    {
      "Card Information": {
        "Card Number": user?.["cardNo"] || "-",
      },
    },
    {
      "Card Information": {
        Batch: user?.["yearOfPassing"] || "-",
        Validity: user?.["validity"] || "Lifetime",
      },
    },
  ];

  if (loading) {
    return MembershipCardSkeleton(data);
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h2 className={styles.title}>Membership Card</h2>
      </div>
      <div className={styles.card}>
        <div className={styles.leftCol}>
          <img className={styles.userdp} src={DP} alt="Profile Pic" />
          <p className={styles.name}> {user?.["alumniName"] || "User"}</p>
        </div>
        <div className={styles.rightCol}>
          {data.map((section, index) => {
            const [title, content] = Object.entries(section)[0];

            return (
              <div className={styles.box} key={index}>
                <h2 className={styles.heading}>{title}</h2>
                <div className={styles.innerBox}>
                  {Object.entries(content).map(([subHeading, value]) => (
                    <div className={styles.subBox} key={subHeading}>
                      <p className={styles.subHeading}>{subHeading}</p>
                      <p className={styles.data}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <img src={Logo} alt="Logo" className={styles.logo} />
        </div>
      </div>
    </div>
  );
};
export default MembershipCard;
