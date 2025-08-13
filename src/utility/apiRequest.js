import { navigateTo } from "./navigation";

const baseURl = "https://gbu-alumniserver.vercel.app";
// const baseURl = "http://192.168.137.12:1212";
// const baseURl = "/api";

const apiRequest = async ({
  url,
  method = "GET",
  body = null,
  headers = {},
  credentials = true,
  setLoading = () => {},
}) => {
  const redirectTOLogin = (message) => {
    const currentPath = window.location.pathname;
    const loginPaths = [
      "/alumni/superAdmin/login",
      "/alumni/login",
      "/alumni/sub-admin/login",
    ];

    if (message === "No token provided.") {
      if (!loginPaths.includes(currentPath)) {
        if (currentPath.startsWith("/alumni/superAdmin")) {
          navigateTo("/alumni/superAdmin/login");
        } else if (currentPath.startsWith("/alumni/sub-admin")) {
          navigateTo("/alumni/sub-admin/login");
        } else {
          navigateTo("/alumni/login");
        }
      }
    }
  };

  try {
    setLoading(true);

    const isFormData = body instanceof FormData;

    const options = {
      method,
      ...(credentials && { credentials: "include" }),
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
      ...(body && { body: isFormData ? body : JSON.stringify(body) }),
    };

    const response = await fetch(baseURl + url, options);
    const rawText = await response.text();

    let data;
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch {
      data = { message: rawText };
    }

    if (!response.ok) {
      redirectTOLogin(data.message);
      return {
        status: "error",
        message: data.message || `Error ${response.status}`,
        data: null,
      };
    }

    return {
      status: "success",
      message: "Request successful",
      data,
    };
  } catch (error) {
    redirectTOLogin(error.message);
    return {
      status: "error",
      message: error.message || "Unknown error occurred",
      data: null,
    };
  } finally {
    setLoading(false);
  }
};

export default apiRequest;
