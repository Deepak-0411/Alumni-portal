const baseURl="https://alumni-portal-iota.vercel.app";
// const baseURl = "/api";

const  apiRequest = async ({
  url,
  method = "GET",
  body = null,
  token = true,
  headers = {},
  setLoading=()=>{}
}) => {
  try {
    setLoading(true);
    const options = {
      method ,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (token) {
      options.headers["Authorization"] = `Bearer ${token}`;
    }

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(baseURl+url, options);
    
    const data = await response.json();

    if (!response.ok) {
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
    return {
      status: "error",
      message: error.message || "Unknown error occurred",
      data: null,
    };
  } finally{
    setLoading(false);
  }
};

export default apiRequest;