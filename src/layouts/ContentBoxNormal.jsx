// ContentBoxNormal.jsx
import { useState, useMemo, useEffect, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import apiRequest from "../apis/apiRequest";
import useDebouncedValue from "../hooks/Debounce";
import useToggle from "../hooks/useToggle";
import ContentBoxUI from "./contextBoxUI";

const ContentBoxNormal = ({
  title,
  apiGet,
  apiEndPointCreate,
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
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [userId, setUserId] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const debounced = useDebouncedValue(searchTerm, 300);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [apiGet],
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      const res = await apiRequest({ url: apiGet, method: "GET" });
      return res?.data?.entries || res?.entries || [];
    },
  });

  const { mutate: deleteEvent, isPending } = useMutation({
    mutationFn: ({ id }) =>
      apiRequest({
        url: `api/events/${id}`,
        method: "DELETE",
      }),
    onSuccess: (data, { id, queryKey }) => {
      if (queryKey) {
        queryClient.setQueryData([queryKey], (oldData) => {
          if (!oldData) return oldData;

          return oldData.filter((item) => item.id !== id);
        });
      }

      toast.success(`Event deleted successfully`);
    },
    onError: (error, { errorMsg }) => {
      console.log("error", error);

      const message =
        errorMsg ||
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete event";

      toast.error(message);
    },
  });

  const dataList = Array.isArray(data) ? data : [];

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

  const handleDelete = (item) => {
    deleteEvent({ id: item.id, queryKey: apiGet });
  };

  useEffect(() => {
    if (isError) toast.error(error?.message || "Something went wrong");
  }, [isError, error]);

  const filteredData = useMemo(() => {
    const t = debounced.toLowerCase();
    return dataList.filter((item) => {
      const name = (item[nameKey] || "").toLowerCase();
      const id = (item[idKey] || "").toString().toLowerCase();
      return name.includes(t) || id.includes(t);
    });
  }, [dataList, debounced, nameKey, idKey]);

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
      displayedData={filteredData}
      showConfirm={showConfirm}
      msgText={msgText}
      userId={userId}
      handleToggleBtn={handleToggleBtn}
      toggleLoading={toggleLoading}
      formFields={formFields}
      apiGet={apiGet}
      tableHeading={tableHeading}
      tableColumn={tableColumn}
      dataOverlayContent={dataOverlayContent}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      // NORMAL MODE ONLY
      isLoading={isLoading}
      isCreating={isCreating}
      setIsCreating={setIsCreating}
      handleDelete={handleDelete}
      apiEndPointCreate={apiEndPointCreate}
      isPending={isPending}
      //   need to made isCreating
      // falg
      isInfiniteScroll={false}
      //   shared
      confirmToggle={confirmToggle}
      cancelToggle={cancelToggle}
      //   need to make set is creating
    />
  );
};

export default ContentBoxNormal;
