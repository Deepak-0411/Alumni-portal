import history from "./history";

const redirectToLogin = (message) => {
  const currentPath = window.location.pathname;

  const loginPaths = [
    "/alumni/superAdmin/login",
    "/alumni/login",
    "/alumni/sub-admin/login",
  ];

  if (
    message === "No token provided." ||
    message === "Invalid token" ||
    message === "Token expired"
  ) {
    if (!loginPaths.includes(currentPath)) {
      if (currentPath.startsWith("/alumni/superAdmin")) {
        history.push("/alumni/superAdmin/login");
      } else if (currentPath.startsWith("/alumni/sub-admin")) {
        history.push("/alumni/sub-admin/login");
      } else {
        history.push("/alumni/login");
      }
    }
  }
};

export default redirectToLogin;
