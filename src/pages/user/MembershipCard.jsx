import { useEffect, useState } from "react";
import DP from "../../assets/user.png";

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
  const { fetchUser, userLoading: loading, currentUser } = useData();

  useEffect(() => {
    if (!Array.isArray(currentUser) || currentUser.length === 0) {
      fetchUser();
    }
  }, []);
  const user = currentUser[0];

  const data = [
    {
      "Personal Information": {
        DOB: user?.["dob"] || "-",
        "Phone No.": user?.["phoneNo"] || "-",
      },
    },
    {
      Residence: {
        Country: user?.["country"] || "-",
      },
    },
    {
      "Card Information": {
        Batch: user?.["batch"] || "-",
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
          <p className={styles.name}> Deepak Kumar</p>
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
        </div>
      </div>
    </div>
  );
};
export default MembershipCard;
