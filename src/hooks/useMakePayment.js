import { useMutation } from "@tanstack/react-query";
import apiRequest from "../apis/apiRequest";
import { toast } from "react-toastify";

export function useMakePayment() {
  const mutation = useMutation({
    mutationFn: async (email) => {
      return await apiRequest({
        url: `/api/payment/initiate-payment`,
        method: "POST",
        body: { email },
        credentials: false,
      });
    },
    onSuccess: (data) => {
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
    },
    onError: (error) => {
      console.error("Error:", error.message || "Unknown error");
      toast.error(
        `Failed to make payment: ${
          error.message || "Something went wrong while starting the payment."
        }`
      );
    },
  });

  return mutation;
}
