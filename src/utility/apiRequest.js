const baseURl = "https://gbu-alumniserver.vercel.app";
// const baseURl = "/api";

const apiRequest = async ({
  url,
  method = "GET",
  body = null,
  headers = {},
  setLoading = () => {},
}) => {
  try {
    setLoading(true);
    const options = {
      method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(baseURl + url, options);
    const rawText = await response.text();

    let data;
    try {
      data = rawText ? JSON.parse(rawText) : {};
    } catch {
      data = { message: rawText }; // fallback if not valid JSON
    }
    // console.log(data);
    

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
  } finally {
    setLoading(false);
  }
};

export default apiRequest;
