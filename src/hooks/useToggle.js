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
      const { id, queryKey, idKey } = variables;

      if (queryKey) {
        queryClient.setQueryData(queryKey, (oldData) => {
          if (!oldData) return oldData;

          // Handle useInfiniteQuery
          if (oldData.pages && Array.isArray(oldData.pages)) {
            return {
              ...oldData,
              pages: oldData.pages.map((page) => {
                if (!Array.isArray(page.entries)) return page;
                console.log(idKey);

                return {
                  ...page,
                  entries: page.entries.map((item) => {
                    return item?.[`${idKey}`] === id
                      ? { ...item, status: data.isActive }
                      : item;
                  }),
                };
              }),
            };
          }

          // Handle normal useQuery
          if (Array.isArray(oldData)) {
            return oldData.map((item) =>
              item.username === id ? { ...item, status: data.isActive } : item
            );
          }

          // If your normal query returns a single object
          if (typeof oldData === "object") {
            return oldData?.[`${idKey}`] === id
              ? { ...oldData, status: data.isActive }
              : oldData;
          }

          return oldData;
        });
      }

      toast.success(`User ${id} ${data.isActive ? "enabled" : "disabled"}`);
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

  const toggle = ({ id, apiToggle, queryKey, setShowConfirm, ...others }) => {
    mutation.mutate({
      id,
      apiUrl: apiToggle,
      queryKey,
      setShowConfirm,
      ...others,
    });
  };

  return {
    toggle,
    loading: mutation.isPending,
    error: mutation.error,
  };
};

export default useToggle;
