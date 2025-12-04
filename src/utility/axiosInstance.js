import axios from "axios";
import baseURL from "./baseURL";
import redirectToLogin from "./redirectTOLogin";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong";

    redirectToLogin(message);

    return Promise.reject(error);
  }
);

export default axiosInstance;
