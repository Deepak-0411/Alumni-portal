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
  showConfirm,
  msgText,
  userId,
  handleToggleBtn,
  toggleLoading,
  formFields,
  apiGet,
  tableHeading,
  tableColumn,
  dataOverlayContent,

  //  NORMAL MODE ONLY

  searchTerm, // used only in Normal mode
  setSearchTerm, // used only in Normal mode
  isLoading, // Normal mode loading
  isCreating, // normal mode
  setIsCreating, // normal mode
  handleDelete, // normal mode

  //   INFINITE MODE ONLY

  isInfiniteScroll, // flag to know which UI to show
  fetchTerm, // only used in Infinite mode
  setFetchTerm, // only infinite
  fetchData, // only infinite
  fetchNextPage, // only infinite
  isFetchingNextPage, // only infinite
  hasNextPage, // only infinite

  // SHARED ACTIONS
  confirmToggle,
  cancelToggle,
}) => {
  return (
    <div className={styles.container}>
      {/* CREATE OVERLAY */}
      {isCreating && (
        <Overlay onClose={() => setIsCreating(false)}>
          <Create dataToSend={formFields} apiEndPointSingle={apiGet} />
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
          {title} ({displayedData?.length || ""})
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
        />
      )}
    </div>
  );
};

export default ContentBoxUI;
