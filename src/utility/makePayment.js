import apiRequest from "./apiRequest";
import { toast } from "react-toastify";

export default async function makePayment(uniqueKey, setLoading = () => {}) {
  if (!uniqueKey) return;
  const response = await apiRequest({
    url: `/api/payu/payment/${uniqueKey}`,
    method: "POST",
    setLoading,
  });

  const { status, data, message } = response;
  console.log(data.formFields);

  if (status === "success") {
    console.log("success");
    //   document.write(data.message);
    // document.close();

    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.formFields.paymentUrl;

    Object.keys(data.formFields).forEach((key) => {
      if (key !== "paymentUrl") {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data.formFields[key];
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
