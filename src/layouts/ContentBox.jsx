import { useState, useMemo, useCallback, useEffect } from "react";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import Input from "../components/Input/Input";
import Table from "../components/Table/Table";
import Overlay from "../components/Overlay/Overlay";
import Create from "../components/Create/Create";
import ConfirmationBox from "../components/ConfirmationBox/ConfirmationBox";
import Loading from "../components/Spinner/Loading";
import { toast } from "react-toastify";
import useDebouncedValue from "../hooks/Debounce";
import apiRequest from "../apis/apiRequest";
import styles from "../styles/modules/layout/Container.module.css";

const ContentBox = ({
  isInfiniteScroll = false,
  title,
  apiGet,
  apiToggle,
  createBtnOpen = true,
  showToggleBtn = false,
  showDeleteBtn = false,
  searchBoxPlaceholder,
  idKey,
  nameKey,
  addText,
  formFields,
  tableHeading,
  tableColumn,
  dataOverlayContent,
}) => {
  const queryClient = useQueryClient();

  // Common state
  const [searchTerm, setSearchTerm] = useState(""); // normal mode search
  const [fetchTerm, setFetchTerm] = useState(""); // infinite mode search
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  // ---------------- NORMAL MODE ----------------

  const {
    data: normalData,
    isLoading: isNormalLoading,
    isError: isNormalError,
    error: normalError,
  } = useQuery({
    queryKey: [apiGet],
    queryFn: async () => {
      const response = await apiRequest({ url: apiGet, method: "GET" });
      return response?.data?.entries || response?.entries || [];
    },
    enabled: !isInfiniteScroll,
  });

  const dataList = Array.isArray(normalData) ? normalData : [];

  // ---------------- INFINITE MODE ----------------

  // const {

  //   data: infiniteData,

  //   fetchNextPage,

  //   isFetchingNextPage,

  //   refetch: refetchInfinite,

  //   isError: isInfiniteError,

  //   error: infiniteError,

  // } = {

  //   data: {},

  //   fetchNextPage: () => {},

  //   isFetchingNextPage: false,

  //   refetch: () => {},

  //   isError: false,

  //   error: "infiniteError",

  // };

  const {
    data: infiniteData,
    fetchNextPage,
    isFetchingNextPage,
    refetch: refetchInfinite,
    isError: isInfiniteError,
    error: infiniteError,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: isSearchMode ? [apiGet, fetchTerm] : [apiGet],
    queryFn: async ({ pageParam = 1 }) => {
      const url = isSearchMode
        ? `${apiGet}?query=${encodeURIComponent(
            fetchTerm
          )}&page=${pageParam}&limit=10`
        : `${apiGet}?page=${pageParam}&limit=10`;

      const response = await apiRequest({ url, method: "GET" });
      const payload = response?.data || {};
      const entries = payload.entries || [];
      const currentPage = payload.page ?? pageParam;

      return { entries, page: currentPage, totalPages: payload.totalPages };
    },

    getNextPageParam: (lastPage) => {
      if (lastPage.totalPages < lastPage.page) return undefined;
      return lastPage.page + 1;
    },
    enabled: isInfiniteScroll,
  });

  const flatInfiniteData = infiniteData?.pages?.flatMap((p) => p.entries) || [];

  // ---------------- COMMON TOGGLE MUTATION ----------------

  const toggleMutation = useMutation({
    mutationFn: () => apiRequest({ url: apiToggle + userId, method: "PATCH" }),
    onSuccess: () => {
      queryClient.invalidateQueries([apiGet]);
      toast.success(`${msgText} successful`);
      setShowConfirm(false);
    },

    onError: (err) =>
      toast.error(err?.message || `Failed to ${msgText.toLowerCase()} user`),
  });

  const handleToggleBtn = useCallback(
    (row) => {
      setUserId(row[idKey]);
      setMsgText(row.status ? "Disable" : "Enable");
      setShowConfirm(true);
    },

    [idKey]
  );

  const confirmToggle = () => toggleMutation.mutate();
  const cancelToggle = () => {
    setShowConfirm(false);
    setUserId(null);
  };

  // ---------------- NORMAL MODE FILTER ----------------

  const processedData = useMemo(() => {
    if (isInfiniteScroll) return [];
    const lower = debouncedSearchTerm.toLowerCase();
    let result = dataList.filter((item) => {
      const name = item[nameKey]?.toLowerCase() || "";
      const id = item[idKey]?.toString().toLowerCase() || "";
      return name.includes(lower) || id.includes(lower);
    });

    if (showToggleBtn)
      result.sort((a, b) => Number(b.status) - Number(a.status));
    return result;
  }, [
    dataList,
    debouncedSearchTerm,
    nameKey,
    idKey,
    showToggleBtn,
    isInfiniteScroll,
  ]);

  // ---------------- INFINITE MODE FETCH BUTTON ----------------

  const fetchData = () => {
    if (!fetchTerm.trim()) {
      toast.error("Enter search text first");
      return;
    }

    setIsSearchMode(true);
    refetchInfinite({ refetchPage: (_, index) => index === 0 });
  };

  useEffect(() => {
    if (!isInfiniteScroll) {
      if (isNormalError)
        toast.error(normalError?.message || "Something went wrong");
    } else {
      if (isInfiniteError)
        toast.error(infiniteError?.message || "Something went wrong");
    }
  }, [
    isNormalError,
    normalError,
    isInfiniteError,
    infiniteError,
    isInfiniteScroll,
  ]);

  useEffect(() => {
    if (fetchTerm.trim() === "") {
      setIsSearchMode(false);
      refetchInfinite();
    }
  }, [fetchTerm]);

  // ---------------- JSX ----------------

  const displayedData = isInfiniteScroll ? flatInfiniteData : processedData;

  const isLoading = isInfiniteScroll ? false : isNormalLoading;

  return (
    <div className={styles.container}>
      {/* CREATE OVERLAY */}

      {isCreating && (
        <Overlay onClose={() => setIsCreating(false)}>
          <Create dataToSend={formFields} apiEndPointSingle={apiGet} />
        </Overlay>
      )}

      {/* CONFIRMATION BOX */}

      {showConfirm && (
        <Overlay onClose={cancelToggle}>
          <ConfirmationBox
            message={`Do you really want to ${msgText.toLowerCase()} user ${userId}?`}
            onConfirm={confirmToggle}
            onCancel={cancelToggle}
            action={msgText}
            loading={toggleMutation.isPending}
          />
        </Overlay>
      )}

      {/* HEADER */}

      <div className={styles.headingDiv}>
        <h1 className={styles.heading}>
          {title} ({displayedData.length})
        </h1>

        <div className={styles.interactionSide}>
          {!isInfiniteScroll ? (
            <Input
              type="text"
              placeHolder={searchBoxPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchbar}
            />
          ) : (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-4 items-center"
            >
              <Input
                type="text"
                placeHolder={searchBoxPlaceholder}
                value={fetchTerm}
                onChange={(e) => setFetchTerm(e.target.value)}
                className={styles.searchbar}
              />

              <button
                className={styles.fetchBtn}
                onClick={fetchData}
                type="submit"
              >
                Fetch
              </button>
            </form>
          )}

          {createBtnOpen && (
            <button
              className={styles.createBtn}
              onClick={() => setIsCreating(true)}
            >
              + {addText}
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}

      {isLoading ? (
        <Loading isFullScrn={true} />
      ) : (
        <Table
          tableHeadings={tableHeading}
          data={displayedData}
          idKey={idKey}
          tableColumn={tableColumn}
          dataOverlayContent={dataOverlayContent}
          showToggleBtn={showToggleBtn}
          handleToggleBtn={handleToggleBtn}
          showDeleteBtn={showDeleteBtn}
          fetchNextPage={isInfiniteScroll ? fetchNextPage : undefined}
          isFetchingNextPage={isInfiniteScroll ? isFetchingNextPage : undefined}
          hasNextPage={hasNextPage}
        />
      )}
    </div>
  );
};

export default ContentBox;
