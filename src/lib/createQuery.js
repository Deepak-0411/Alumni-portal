import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utility/apiRequest";

export const createQuery = (key, url, options = {}) => {
  return useQuery({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const res = await apiRequest({ url });
      return res?.data?.entries || res?.data || [];
    },
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    ...options,
  });
};
