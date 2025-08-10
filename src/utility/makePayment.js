import apiRequest from "./apiRequest";
import { toast } from "react-toastify";

export default async function makePayment(email, setLoading = () => {}) {
  if (!email) return;
  const response = await apiRequest({
    url: `/api/payment/initiate-payment/?email=${email}`,
    method: "POST",
    setLoading,
  });

  const { status, data, message } = response;
  console.log(data);

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

    console.log(form);

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

// import { toast } from "react-toastify";

// export default function makePayment() {
// try {
//   // Create a form element
//   const form = document.createElement("form");
//   form.method = "POST";
//   form.action = "https://test.payu.in/_payment"; // PayU endpoint

//   // Payment fields
//   const formFields = {
//     key: "JPM7Fg",
//     surl: "https://gbu-alumniserver.vercel.app"+"/api/payu/pay/success",
//     furl: "https://test-payment-middleware.payu.in/simulatorResponse",
//     txnid: "koo1",
//     amount: "1000",
//     productinfo: "Alumni",
//     firstname: "Deepak",
//     email: "deepak0411.kr@gmail.com",
//     phone: "8368017570",
//     hash: "2c69746532fa26f015067bea20373cd18ad3bf330ecf24c8271fde5e871dc48f54cac86512f5c230507fca9a26e749bed59dcae762de0df563608cec70dadbe2"
//   };

//   // Append hidden inputs for each field
//   Object.keys(formFields).forEach((key) => {
//     const input = document.createElement("input");
//     input.type = "hidden";
//     input.name = key;
//     input.value = formFields[key];
//     form.appendChild(input);
//   });

//   // Add form to the body and submit it
//   document.body.appendChild(form);
//   form.submit();
// } catch (error) {
//   console.error("Error starting payment:", error);
//   toast.error("Failed to initiate payment. Please try again.");
// }

// }
