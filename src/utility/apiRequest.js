const baseURl="https://alumni-portal-ruddy.vercel.app/api";
// const baseURl = "/api";

export const apiRequest = async ({
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
      options.body = body;
    }
    console.log("options",options);
    
    const response = await fetch(baseURl+url, options);
    const text = await response.text();
console.log( text);
    
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
