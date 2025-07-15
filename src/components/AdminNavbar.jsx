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
    // <aside className="w-58 bg-gray-50 shadow-md border-r  border-gray-200">
    <div className="w-60 bg-gray-50 shadow-md border-r  border-gray-200 " >
      <nav className="flex pt-10 flex-col  items-center text-center  space-y-6 bg-transparent">
        {navlinks.map(({ name, path }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              `w-45 py-3 px-6 rounded-full text-base tracking-wide transition-all duration-600 cursor-pointer border shadow-md${
                isActive
                  ? " bg-purple-200/60 text-purple-600 font-semibold border-purple-200"
                  : " bg-gray-200/40 text-purple-500 border-gray-200 hover:bg-gray-200"
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </nav>
    </div>
    // </aside>
  );
};

export default AdminNavbar;
