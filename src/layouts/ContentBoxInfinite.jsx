// ContentBoxInfinite.jsx
import { useState, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiRequest from "../apis/apiRequest";
import useToggle from "../hooks/useToggle";
import ContentBoxUI from "./contextBoxUI";

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
  const [isSearchMode, setIsSearchMode] = useState(false);

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: isSearchMode ? [apiGet, fetchTerm] : [apiGet],
    refetchOnWindowFocus: false,
    queryFn: async ({ pageParam = 1 }) => {
      const query = fetchTerm
        ? `?query=${encodeURIComponent(fetchTerm)}&page=${pageParam}&limit=10`
        : `?page=${pageParam}&limit=10`;

      const res = await apiRequest({ url: apiGet + query, method: "GET" });
      const payload = res?.data || {};

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

  const fetchData = () => {
    if (!fetchTerm.trim()) return toast.error("Enter search text first");
    setIsSearchMode(true);
    refetch();
  };

  useEffect(() => {
    if (!fetchTerm.trim()) {
      setIsSearchMode(false);
      refetch();
    }
  }, [fetchTerm]);

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
      apiToggle,
      queryKey: apiGet,
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
      showConfirm={showConfirm}
      msgText={msgText}
      userId={userId}
      // UI flags
      handleToggleBtn={handleToggleBtn}
      toggleLoading={toggleLoading}
      formFields={formFields}
      apiGet={apiGet}
      tableHeading={tableHeading}
      tableColumn={tableColumn}
      dataOverlayContent={dataOverlayContent}
      // infinite only
      fetchTerm={fetchTerm}
      setFetchTerm={setFetchTerm}
      fetchData={fetchData}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      isLoading={false}
      // flag
      isInfiniteScroll={true}
      // shared
      confirmToggle={confirmToggle}
      cancelToggle={cancelToggle}
    />
  );
};

export default ContentBoxInfinite;
