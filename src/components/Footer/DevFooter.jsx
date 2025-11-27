import { useNavigate } from "react-router-dom";

const DevFooter = ({styles={}}) => {
  const navigate = useNavigate();

  const handleDevClick = () => {
    navigate("/devTeam");
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex items-center justify-center text-center pb-4" style={styles}>
      <button
        className="text-black text-[0.9rem] font-normal select-none cursor-pointer"
        onClick={handleDevClick}
      >
        Designed & Developed By
        <span className="text-[#5a4fcf]"> Team GBU</span>
      </button>
    </div>
  );
};
export default DevFooter;
