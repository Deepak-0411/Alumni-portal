import { NavLink, useNavigate } from "react-router-dom";
import apiRequest from "../apis/apiRequest";
import Loading from "./Spinner/Loading";
import DevFooter from "../components/Footer/DevFooter";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AdminNavbar = ({ forPage }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  let logoutApi;
  let redirectPath;
  let navlinks;
  switch (forPage) {
    case "superAdmin":
      navlinks = [
        { name: "Sub Admin", path: "subadmin" },
        { name: "Alumni", path: "alumni" },
        { name: "Finance", path: "finance" },
        // { name: "School", path: "school" },
        { name: "Events", path: "events" },
      ];
      logoutApi = `/api/root/logout`;
      redirectPath = `/alumni/superAdmin/login`;
      break;
    case "subAdmin":
      navlinks = [
        { name: "Active Users", path: "active-users" },
        { name: "Approved Users", path: "approved-users" },
        { name: "Verify Users", path: "verify-users" },
      ];
      logoutApi = `/api/subadmin/logout`;
      redirectPath = `/alumni/sub-admin/login`;
      break;
    default:
      navlinks = [];
      logoutApi = ``;
      redirectPath = ``;
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await apiRequest({
        url: logoutApi,
        method: "POST",
      });
    },
    onSuccess: () => {
      localStorage.setItem(forPage, "false");
      queryClient.clear();
      navigate(redirectPath);
    },
    onError: () => {
      toast.error("Failed to logout");
    },
  });

  return (
    // <aside className="w-58 bg-gray-50 shadow-md border-r  border-gray-200">
    <div className="bg-gray-50 shadow-md border-r  border-gray-200 flex items-center justify-between flex-col">
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
      <div className=" w-full flex items-center flex-col">
        <div className=" py-6">
          <button
            className=" w-45 py-3 px-6 rounded-full text-black font-semibold  text-base tracking-wide transition-all duration-600 cursor-pointer border-[1.35px] flex items-center justify-center gap-3 "
            onClick={mutate}
          >
            {isPending ? (
              <Loading color="blue" size="small" />
            ) : (
              <>
                Logout <FiLogOut size={18} strokeWidth={2.65} />
              </>
            )}
          </button>
        </div>
        <DevFooter styles={{ position: "inherit" }} />
      </div>
    </div>
    // </aside>
  );
};

export default AdminNavbar;
