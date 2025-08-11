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
  const { fetchUser, userLoading:loading, currentUser } = useData();

  useEffect(() => {
    if (!Array.isArray(currentUser) || currentUser.length === 0) {
      fetchUser();
    }
  }, []);

  const data = [
    {
      "Personal Information": {
        DOB: "20/12/1994",
        "Phone No.": "+91 6725 2889",
      },
    },
    {
      Residence: {
        Country: "India",
      },
    },
    {
      "Card Information": {
        Batch: "2025",
        Validity: "2030",
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

// import { useEffect, useState } from "react";
// import DP from "../../assets/user.png";

// import styles from "../../styles/modules/user/MembershipCard.module.css";

// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

// const MembershipCard = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate API/data fetch
//     const timer = setTimeout(() => {
//       setData([
//         {
//           "Personal Information": {
//             DOB: "20/12/1994",
//             "Phone No.": "+91 6725 2889",
//           },
//         },
//         {
//           Residence: {
//             Country: "India",
//           },
//         },
//         {
//           "Card Information": {
//             Batch: "2025",
//             Validity: "2030",
//           },
//         },
//       ]);
//       setLoading(false);
//     }, 20000);

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className={styles.container}>
//       <div className={styles.titleBox}>
//         <h2 className={styles.title}>
//           {loading ? <Skeleton width={200} /> : 'Membership Card'}
//         </h2>
//       </div>

//       <div className={styles.card}>
//         <div className={styles.leftCol}>
//           {loading ? (
//             <>
//               <Skeleton circle height={80} width={80} />
//               <Skeleton width={100} height={20} style={{ marginTop: '10px' }} />
//             </>
//           ) : (
//             <>
//               <img className={styles.userdp} src={DP} alt="Profile Pic" />
//               <p className={styles.name}>Deepak Kumar</p>
//             </>
//           )}
//         </div>

//         <div className={styles.rightCol}>
//           {(loading ? [1, 2, 3] : data).map((section, index) => {
//             const [title, content] = loading
//               ? ["Loading Section", { Label1: "", Label2: "" }]
//               : Object.entries(section)[0];

//             return (
//               <div className={styles.box} key={index}>
//                 <h2 className={styles.heading}>
//                   {loading ? <Skeleton width={180} /> : title}
//                 </h2>
//                 <div className={styles.innerBox}>
//                   {Object.entries(content).map(([subHeading, value], subIndex) => (
//                     <div className={styles.subBox} key={subIndex}>
//                       <p className={styles.subHeading}>
//                         {loading ? <Skeleton width={100} /> : subHeading}
//                       </p>
//                       <p className={styles.data}>
//                         {loading ? <Skeleton width={120} /> : value}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MembershipCard;
