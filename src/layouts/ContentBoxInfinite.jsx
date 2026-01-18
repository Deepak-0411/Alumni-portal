// ContentBoxInfinite.jsx
import { useState, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiRequest from "../apis/apiRequest";
import useToggle from "../hooks/useToggle";
import ContentBoxUI from "./contextBoxUI";
import useDebouncedValue from "../hooks/Debounce";

const ContentBoxInfinite = ({
  title,
  apiGet,
  apiToggle,
  createBtnOpen = true,
  showToggleBtn = false,
  showDeleteBtn = false,
  searchBoxPlaceholder,
  idKey,
  addText,
  formFields,
  tableHeading,
  tableColumn,
  dataOverlayContent,
}) => {
  const [fetchTerm, setFetchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [dataLength, setDataLength] = useState(0);

  const debounced = useDebouncedValue(fetchTerm, 500);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [apiGet, debounced],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    queryFn: async ({ pageParam = 1 }) => {
      const query = debounced
        ? `?query=${encodeURIComponent(debounced)}&page=${pageParam}&limit=10`
        : `?page=${pageParam}&limit=10`;

      const res = await apiRequest({ url: apiGet + query, method: "GET" });
      const payload = res?.data || {};

      setDataLength(payload.totalItems);

      return {
        entries: payload.entries || [],
        page: payload.page || 1,
        totalPages: payload.totalPages || 1,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const flatData = data?.pages?.flatMap((p) => p.entries) || [];

  useEffect(() => {
    if (!debounced.trim()) {
      refetch();
    }
  }, [debounced]);

  useEffect(() => {
    if (isError) toast.error(error?.message || "Something went wrong");
  }, [isError, error]);

  const { toggle, loading: toggleLoading } = useToggle();

  const handleToggleBtn = useCallback(
    (row) => {
      setUserId(row[idKey]);
      setMsgText(row.status ? "Disable" : "Enable");
      setShowConfirm(true);
    },
    [idKey]
  );
  const confirmToggle = () => {
    toggle({
      id: userId,
      idKey,
      apiToggle,
      queryKey: [apiGet, debounced],
      setShowConfirm,
    });
  };

  const cancelToggle = () => {
    setShowConfirm(false);
  };

  return (
    <ContentBoxUI
      // shared
      title={title}
      addText={addText}
      idKey={idKey}
      createBtnOpen={createBtnOpen}
      showToggleBtn={showToggleBtn}
      showDeleteBtn={showDeleteBtn}
      searchBoxPlaceholder={searchBoxPlaceholder}
      displayedData={flatData}
      totalDataLength={dataLength}
      showConfirm={showConfirm}
      msgText={msgText}
      userId={userId}
      isLoading={isPending}
      // UI flags
      handleToggleBtn={handleToggleBtn}
      toggleLoading={toggleLoading}
      formFields={formFields}
      apiGet={apiGet}
      tableHeading={tableHeading}
      tableColumn={tableColumn}
      dataOverlayContent={dataOverlayContent}
      searchTerm={fetchTerm}
      setSearchTerm={setFetchTerm}
      // infinite only
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      queryKey={[apiGet, debounced]}
      // flag
      isInfiniteScroll={true}
      // shared
      confirmToggle={confirmToggle}
      cancelToggle={cancelToggle}
    />
  );
};

export default ContentBoxInfinite;
