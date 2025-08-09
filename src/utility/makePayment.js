import apiRequest from "./apiRequest";
import { toast } from "react-toastify";

export default async function makePayment(uniqueKey, setLoading = () => {}) {
  if (!uniqueKey) return;
  const response = await apiRequest({
    url: `/api/payu/pay/${uniqueKey}`,
    method: "POST",
    setLoading,
  });

  const { status, data, message } = response;
  console.log(response);
  

  if (status === "success") {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.paymentUrl;

    Object.keys(data).forEach((key) => {
      if (key !== "paymentUrl") {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
      }
    });

    document.body.appendChild(form);
    form.submit();
  } else {
    console.error("Error:", message || "Unknown error");
    toast.error(
      `Failed to make payment: ${
        message || "Something went wrong while starting the payment."
      }`
    );
  }
}
