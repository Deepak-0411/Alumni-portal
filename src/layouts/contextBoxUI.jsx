// ContentBoxUI.jsx

import Input from "../components/Input/Input";
import Table from "../components/Table/Table";
import Overlay from "../components/Overlay/Overlay";
import Create from "../components/Create/Create";
import ConfirmationBox from "../components/ConfirmationBox/ConfirmationBox";
import Loading from "../components/Spinner/Loading";
import styles from "../styles/modules/layout/Container.module.css";

const ContentBoxUI = ({
  //  SHARED BETWEEN BOTH
  title,
  addText,
  idKey,
  createBtnOpen,
  showToggleBtn,
  showDeleteBtn,
  searchBoxPlaceholder,
  displayedData,
  totalDataLength,
  showConfirm,
  msgText,
  userId,
  handleToggleBtn,
  toggleLoading,
  formFields,
  tableHeading,
  tableColumn,
  dataOverlayContent,
  searchTerm,
  setSearchTerm,
  isLoading,

  //  NORMAL MODE ONLY

  isCreating, // normal mode
  setIsCreating, // normal mode
  handleDelete, // normal mode
  apiEndPointCreate,
  isPending,

  //   INFINITE MODE ONLY

  isInfiniteScroll, // flag to know which UI to show
  fetchNextPage, // only infinite
  isFetchingNextPage, // only infinite
  hasNextPage, // only infinite
  queryKey,

  // SHARED ACTIONS
  confirmToggle,
  cancelToggle,
}) => {
  return (
    <div className={styles.container}>
      {/* CREATE OVERLAY */}
      {isCreating && (
        <Overlay onClose={() => setIsCreating(false)}>
          <Create
            dataToSend={formFields}
            apiEndPointSingle={apiEndPointCreate}
          />
        </Overlay>
      )}

      {/* CONFIRM BOX */}
      {showConfirm && (
        <Overlay onClose={cancelToggle}>
          <ConfirmationBox
            message={`Do you really want to ${msgText.toLowerCase()} user ${userId}?`}
            onConfirm={confirmToggle}
            onCancel={cancelToggle}
            action={msgText}
            loading={toggleLoading}
          />
        </Overlay>
      )}

      {/* HEADER */}
      <div className={styles.headingDiv}>
        <h1 className={styles.heading}>
          {title} ({totalDataLength || displayedData.length || "0"})
        </h1>

        <div className={styles.interactionSide}>
          <Input
            type="text"
            placeHolder={searchBoxPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchbar}
          />

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
          handleDeleteBtn={handleDelete}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isInfiniteScroll ? isFetchingNextPage : undefined}
          hasNextPage={isInfiniteScroll ? hasNextPage : undefined}
          queryKey={queryKey}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default ContentBoxUI;
