import { useEffect } from "react";
import { useData } from "../context/DataContext";

const UserInfo = ({ name = "User", role = "Admin", image = null }) => {
  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "U";

  const { fetchUser, currentUser, userLoading } = useData();

  useEffect(() => {
    if (!Array.isArray(currentUser) || currentUser.length === 0) {
      fetchUser("subAdmin");
    }
  }, []);

  const userRole = (() => {
    switch (role) {
      case "subAdmin":
        return "Sub-admin";
      case "admin":
        return "Admin";
      default:
        role;
    }
  })();

  return (
    <div className="flex items-center gap-3 px-3 py-2 cursor-pointer rounded-3xl bg-purple-200/60 border border-purple-200 shadow-md backdrop-blur-md hover:shadow-lg transition-all duration-300">
      <div className="text-right">
        <p className="text-base font-semibold text-purple-600">
          {currentUser[0]?.["name"] || name}
        </p>
        <p className="text-sm font-medium text-purple-500">{userRole}</p>
      </div>

      {image ? (
        <div className="w-11 h-11 rounded-full bg-white border border-purple-200 shadow-sm overflow-hidden">
          <img
            src={image}
            alt="profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      ) : (
        <div className="w-11 h-11 rounded-full bg-white text-purple-600 border border-purple-300 flex items-center justify-center font-bold text-lg  shadow">
          {getInitial(currentUser[0]?.["name"] || name)}
        </div>
      )}
    </div>
  );
};

export default UserInfo;
