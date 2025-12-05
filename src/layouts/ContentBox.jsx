import { useState, useEffect, useMemo, useCallback } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import useDebouncedValue from "../hooks/Debounce";
import apiRequest from "../apis/apiRequest";

import Input from "../components/Input/Input";
import Table from "../components/Table/Table";
import Overlay from "../components/Overlay/Overlay";
import Create from "../components/Create/Create";
import ConfirmationBox from "../components/ConfirmationBox/ConfirmationBox";
import Loading from "../components/Spinner/Loading";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [fetchTerm, setFetchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  // ---------------- NORMAL MODE (extracted) ----------------
  const {
    dataList,
    isLoading: isNormalLoading,
    isError: isNormalError,
    error: normalError,
  } = useNormalMode(apiGet, !isInfiniteScroll);

  // ---------------- INFINITE MODE (extracted) ----------------
  const {
    flatData: flatInfiniteData,
    fetchNextPage,
    refetch: refetchInfinite,
    hasNextPage,
    isFetchingNextPage,
    isError: isInfiniteError,
    error: infiniteError,
  } = useInfiniteMode(apiGet, fetchTerm, isSearchMode, isInfiniteScroll);

  // ---------------- PROCESSED NORMAL MODE ----------------
  const processedData = useMemo(() => {
    if (isInfiniteScroll) return [];

    const lower = debouncedSearchTerm.toLowerCase();
    const filtered = dataList.filter((item) => {
      const name = item[nameKey]?.toLowerCase() || "";
      const id = item[idKey]?.toString().toLowerCase() || "";
      return name.includes(lower) || id.includes(lower);
    });

    if (showToggleBtn) {
      filtered.sort((a, b) => Number(b.status) - Number(a.status));
    }

    return filtered;
  }, [
    dataList,
    debouncedSearchTerm,
    nameKey,
    idKey,
    showToggleBtn,
    isInfiniteScroll,
  ]);

  // ---------------- FINAL DATA ----------------
  const displayedData = isInfiniteScroll ? flatInfiniteData : processedData;

  // ---------------- TOGGLE MUTATION ----------------
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

  const fetchData = () => {
    if (!fetchTerm.trim()) return toast.error("Enter search text first");
    setIsSearchMode(true);
    refetchInfinite({ refetchPage: (_, i) => i === 0 });
  };

  // ---------------- ERROR HANDLING ----------------
  useEffect(() => {
    if (!isInfiniteScroll && isNormalError)
      toast.error(normalError?.message || "Something went wrong.");

    if (isInfiniteScroll && isInfiniteError)
      toast.error(infiniteError?.message || "Something went wrong.");
  }, [
    isNormalError,
    normalError,
    isInfiniteError,
    infiniteError,
    isInfiniteScroll,
  ]);

  // ---------------- RESET SEARCH MODE ----------------
  useEffect(() => {
    if (fetchTerm.trim() === "") {
      setIsSearchMode(false);
      refetchInfinite();
    }
  }, [fetchTerm]);

  // ---------------- JSX ----------------
  return (
    <div className={styles.container}>
      {isCreating && (
        <Overlay onClose={() => setIsCreating(false)}>
          <Create dataToSend={formFields} apiEndPointSingle={apiGet} />
        </Overlay>
      )}

      {showConfirm && (
        <Overlay onClose={() => setShowConfirm(false)}>
          <ConfirmationBox
            message={`Do you really want to ${msgText.toLowerCase()} user ${userId}?`}
            onConfirm={confirmToggle}
            onCancel={() => setShowConfirm(false)}
            action={msgText}
            loading={toggleMutation.isPending}
          />
        </Overlay>
      )}

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
              <button className={styles.fetchBtn} onClick={fetchData}>
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

      {isInfiniteScroll ? (
        <Table
          tableHeadings={tableHeading}
          data={displayedData}
          idKey={idKey}
          tableColumn={tableColumn}
          dataOverlayContent={dataOverlayContent}
          showToggleBtn={showToggleBtn}
          handleToggleBtn={handleToggleBtn}
          showDeleteBtn={showDeleteBtn}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      ) : isNormalLoading ? (
        <Loading isFullScrn />
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
        />
      )}
    </div>
  );
};

export default ContentBox;
