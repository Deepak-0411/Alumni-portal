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
        window.location.href("/alumni/superAdmin/login");
      } else if (currentPath.startsWith("/alumni/sub-admin")) {
        window.location.href("/alumni/sub-admin/login");
      } else {
        window.location.href("/alumni/login");
      }
    }
  }
};

export default redirectToLogin;
