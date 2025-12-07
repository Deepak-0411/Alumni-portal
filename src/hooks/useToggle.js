import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiRequest from "../apis/apiRequest";

const useToggle = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ apiUrl, id }) =>
      apiRequest({
        url: `${apiUrl}${id}`,
        method: "PATCH",
      }),

    onSuccess: (data, variables) => {
      const { id, queryKey } = variables;

      if (queryKey) {
        queryClient.setQueryData([queryKey], (oldData) => {
          if (!oldData) return oldData;

          return oldData.map((item) =>
            item.username === id ? { ...item, status: data.isActive } : item
          );
        });
      }

      toast.success(`Alumni ${id} ${data.isActive ? "enabled" : "disabled"}`);
    },

    onError: (error, { errorMsg }) => {
      console.log("error", error);

      const message =
        errorMsg ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update status";

      toast.error(message);
    },

    onSettled: (_data, _error, variables) => {
      if (variables?.setShowConfirm) {
        variables.setShowConfirm(false);
      }
    },
  });

  const toggle = ({ id, apiToggle, queryKey, setShowConfirm }) => {
    mutation.mutate({
      id,
      apiUrl: apiToggle,
      queryKey,
      setShowConfirm,
    });
  };

  return {
    toggle,
    loading: mutation.isPending,
    error: mutation.error,
  };
};

export default useToggle;
