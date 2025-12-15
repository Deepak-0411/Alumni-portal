import axios from "axios";
import baseURL from "../utility/baseURL.js";
import redirectToLogin from "../utility/redirectTOLogin.js";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || error.message || "Something went wrong";

    redirectToLogin(message);

    return Promise.reject(error);
  }
);

export default axiosInstance;
