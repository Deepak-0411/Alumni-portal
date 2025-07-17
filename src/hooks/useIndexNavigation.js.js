import { useEffect } from "react";

const useIndexNavigation = ({ handleIndexChange, disabled = false }) => {
  useEffect(() => {
    if (typeof handleIndexChange !== "function" || disabled) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          handleIndexChange(-1);
          break;
        case "ArrowRight":
          handleIndexChange(1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleIndexChange, disabled]);
};

export default useIndexNavigation;
