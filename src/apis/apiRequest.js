import axiosInstance from "./axiosInstance";

const apiRequest = async ({
  url,
  method = "GET",
  body = null,
  headers = {},
}) => {
  try {
    const isFormData = body instanceof FormData;

    const response = await axiosInstance({
      url,
      method,
      data: body,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...headers,
      },
    });

    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || error.message || "Request failed";
    throw new Error(message);
  }
};

export default apiRequest;
