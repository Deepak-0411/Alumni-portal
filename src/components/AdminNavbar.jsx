import { NavLink } from "react-router-dom";

const AdminNavbar = ({ forPage }) => {
  const navlinks = (() => {
    switch (forPage) {
      case "admin":
        return [
          { name: "Sub Admin", path: "subadmin" },
          { name: "Alumni", path: "alumni" },
          { name: "Finance", path: "finance" },
          { name: "School", path: "school" },
          { name: "Events", path: "events" },
        ];
      case "subAdmin":
        return [
          { name: "Active Users", path: "active-users" },
          { name: "Verify Users", path: "verify-users-list" },
        ];
      default:
        return [];
    }
  })();

  return (
    <div className=" w-56 flex flex-col items-center py-10 space-y-6 bg-transparent">
      {navlinks.map(({ name, path }) => (
        <NavLink
          key={name}
          to={path}
          end
          className={({ isActive }) =>
            `w-44 py-3 px-6 rounded-full text-[15px] tracking-wide transition-all duration-300 cursor-pointer border shadow-md ${
              isActive
                ? "bg-purple-200/60 text-purple-600 font-semibold border-purple-200"
                : "bg-gray-200/30 text-purple-500 border-gray-200 hover:bg-gray-200"
            }`
          }
        >
          {name}
        </NavLink>
      ))}
    </div>
  );
};

export default AdminNavbar;
