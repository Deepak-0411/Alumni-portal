import { useState, useMemo, useCallback, useEffect } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import Input from "../components/Input/Input";
import Table from "../components/Table/Table";
import InfiniteScrollTable from "../components/Table/InfiniteScrollTable";
import styles from "../styles/modules/layout/Container.module.css";
import useDebouncedValue from "../hooks/Debounce";
import apiRequest from "../apis/apiRequest";
import Overlay from "../components/Overlay/Overlay";
import Create from "../components/Create/Create";
import { toast } from "react-toastify";
import ConfirmationBox from "../components/ConfirmationBox/ConfirmationBox";
import Loading from "../components/Spinner/Loading";

const ContentBox = ({
  isSuperadmin = true,
  showToggleBtn = false,
  createBtnOpen = true,
  isInfiniteScroll = false,
  title,
  apiGet,
  apiToggle,
  apiEndPointCreate,
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

  const [searchTerm, setSearchTearm] = useState("");
  const [fetchTerm, setFetchTearm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [hasMorePage, setHasMorePage] = useState(true);

  const debouncedSearchTerm = useDebouncedValue(searchTerm, 300);

  // Fetch list
  const {
    data: dataList = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    enabled: !isInfiniteScroll,
    queryKey: [apiGet],
    queryFn: async () => {
      const response = await apiRequest({
        url: apiGet,
        method: "GET",
      });

      return response?.data?.entries || response?.entries || [];
    },
  });

  const {
    data: infiniteData,
    isFetchingNextPage,
    isError: isInfiniteError,
    error: infiniteError,
    fetchNextPage,
  } = useInfiniteQuery({
    enabled: isInfiniteScroll,
    queryKey: [apiGet],
    queryFn: async ({ pageParam }) => {
      const response = await apiRequest({
        url: `${apiGet}?limit=10&page=${pageParam}`,
        method: "GET",
      });
    },
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => {
      if (hasMorePage) {
        return allPages + 1;
      } else {
        return undefined;
      }
    },
  });

  useEffect(() => {
    toast.error(infiniteError.message);
  }, [isInfiniteError]);

  // Toggle mutation
  const toggleMutation = useMutation({
    mutationFn: () =>
      apiRequest({
        url: apiToggle + userId,
        method: "PATCH",
      }),

    onSuccess: () => {
      queryClient.setQueryData([apiGet], (oldList) =>
        oldList.map((item) =>
          item[idKey] === userId ? { ...item, status: !item.status } : item
        )
      );

      toast.success(`${msgText} successful`);
      setShowConfirm(false);
    },

    onError: (err) => {
      toast.error(err?.message || `Failed to ${msgText.toLowerCase()} user`);
    },
  });

  const fetchData = () => {};

  const confirmToggle = () => {
    toggleMutation.mutate();
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setUserId(null);
  };

  const handleToggleBtn = useCallback(
    (user) => {
      setUserId(user[idKey]);
      setMsgText(user.status ? "Disable" : "Enable");
      setShowConfirm(true);
    },
    [idKey]
  );

  // Filter + sort optimized
  const processedData = useMemo(() => {
    const lower = debouncedSearchTerm.toLowerCase();

    const result = dataList.filter((item) => {
      const name = item[nameKey]?.toLowerCase() || "";
      const id = item[idKey]?.toString().toLowerCase() || "";
      return name.includes(lower) || id.includes(lower);
    });

    if (showToggleBtn) {
      result.sort((a, b) => Number(b.status) - Number(a.status));
    }

    return result;
  }, [dataList, debouncedSearchTerm, showToggleBtn, nameKey, idKey]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.message || "Something went wrong");
    }
  }, [isError, error]);

  return (
    <div className={styles.container}>
      {isCreating && (
        <Overlay onClose={() => setIsCreating(false)}>
          <Create
            dataToSend={formFields}
            apiEndPointSingle={apiEndPointCreate}
          />
        </Overlay>
      )}

      {showConfirm && (
        <Overlay onClose={cancelDelete}>
          <ConfirmationBox
            message={`Do you really want to ${msgText.toLowerCase()} user ${userId}?`}
            onConfirm={confirmToggle}
            onCancel={cancelDelete}
            action={msgText}
            loading={toggleMutation.isPending}
          />
        </Overlay>
      )}

      <div className={styles.headingDiv}>
        <h1 className={styles.heading}>
          {title} ({dataList.length})
        </h1>

        <div className={styles.interactionSide}>
          {!isInfiniteScroll && (
            <Input
              type="text"
              name="searchBox"
              placeHolder={searchBoxPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTearm(e.target.value)}
              className={styles.searchbar}
            />
          )}
          {isInfiniteScroll && (
            <>
              <Input
                type="text"
                name="searchBox"
                placeHolder={searchBoxPlaceholder}
                value={fetchTerm}
                onChange={(e) => setFetchTearm(e.target.value)}
                className={styles.searchbar}
              />

              <button className={styles.fetchBtn} onClick={fetchData}>
                Fetch
              </button>
            </>
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

      {!isInfiniteScroll && isLoading ? (
        <Loading isFullScrn={true} />
      ) : (
        <Table
          tableHeadings={tableHeading}
          filteredData={processedData}
          idKey={idKey}
          handleToggleBtn={handleToggleBtn}
          tableColumn={tableColumn}
          dataOverlayContent={dataOverlayContent}
          showToggleBtn={showToggleBtn}
        />
      )}
      {isInfiniteScroll && (
        <InfiniteScrollTable
          tableHeadings={tableHeading}
          filteredData={infiniteData}
          idKey={idKey}
          handleToggleBtn={handleToggleBtn}
          tableColumn={tableColumn}
          dataOverlayContent={dataOverlayContent}
          showToggleBtn={showToggleBtn}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={infiniteLoading}
          hasNextPage={hasMorePage}
        />
      )}
    </div>
  );
};

export default ContentBox;
