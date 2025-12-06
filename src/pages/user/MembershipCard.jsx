import FallBackDP from "../../assets/user.webp";
import baseURL from "../../utility/baseURL";
import Logo from "../../assets/GBULOGO.webp";
import signature from "../../assets/signature.webp";

import styles from "../../styles/modules/user/MembershipCard.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Payment from "../../components/Payment/Payment";
import { useUser } from "../../apis/user.query";
import { useCard } from "../../apis/card.query";

const MembershipCard = () => {
  const {
    data: currentUser,
    isLoading,
    isSuccess: userLoaded,
    refetch: refetchUser,
  } = useUser();
  const { data: card, isSuccess: cardLoaded, refetch: refetchCard } = useCard();

  const data = [
    {
      "Personal Information": {
        DOB: card?.dob || "-",
        "Phone No.": card?.phoneNo || "-",
      },
    },
    {
      "Card Information": {
        "Card Number": card?.cardNo || "-",
        Batch: card?.yearOfPassing || "-",
      },
    },
  ];

  // Case 1: User is unpaid
  if (!isLoading && currentUser?.isPaid == false) {
    return <Payment email={currentUser?.email} />;
  }

  // Case 2: User loaded but no card data available
  if (userLoaded && cardLoaded && !card?.cardNo) {
    const handleRetry = () => {
      refetchUser();
      refetchCard();
    };

    return (
      <div className={styles.container}>
        <div className={styles.titleBox}>
          <h2 className={styles.title}>Membership Card</h2>
        </div>
        <div className={styles.errorBox}>
          <p>
            ⚠️ We couldn’t load your Membership Card at the moment. <br />
            Please try again.
          </p>
          <button className={styles.retryBtn} onClick={handleRetry}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Case 3: Normal (isLoading or valid card)
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <h2 className={styles.title}>Membership Card</h2>
      </div>
      <div className={styles.card}>
        {/* Left Column */}
        <div className={styles.leftCol}>
          {isLoading ? (
            <>
              <Skeleton circle height={80} width={80} />
              <Skeleton height={28} width={100} />
            </>
          ) : (
            <>
              <img
                className={styles.userdp}
                src={baseURL + card?.profileImg || FallBackDP}
                alt="Profile Pic"
              />
              <p className={styles.name}>{card?.alumniName || "User"}</p>
              <p className={styles.validUpto}>Lifetime Member</p>
            </>
          )}
        </div>

        {/* Right Column */}
        <div className={styles.rightCol}>
          <div className={styles.associationNameDiv}>
            <p className={styles.associationName}>
              Gautam Buddha University Alumni Association
            </p>
            <p className={styles.cllgAdd}>
              Yamuna Expressway, Greater Noida, Gautam Buddha Nagar, Uttar
              Pradesh-201312
            </p>
          </div>

          {data.map((section, index) => {
            const [title, content] = Object.entries(section)[0];
            return (
              <div className={styles.box} key={index}>
                <h2 className={styles.heading}>{title}</h2>
                <div className={styles.innerBox}>
                  {Object.entries(content).map(([subHeading, value]) => (
                    <div className={styles.subBox} key={subHeading}>
                      <p className={styles.subHeading}>{subHeading}</p>
                      {isLoading ? (
                        <Skeleton height={28} width="100%" />
                      ) : (
                        <p className={styles.data}>{value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {!isLoading && (
            <>
              <div className={styles.signatureBox}>
                <img
                  className={styles.signature}
                  src={signature}
                  alt="Secretary GBUAA"
                />
                <p className={styles.signatureP}>Secretary, GBUAA</p>
              </div>
              <img src={Logo} alt="Logo" className={styles.logo} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
