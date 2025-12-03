import { Link } from "react-router-dom";

const DevFooter = ({ styles = {} }) => {
  return (
    <div
      className="fixed bottom-0 left-0 w-full flex items-center justify-center text-center p-4"
      style={styles}
    >
      <Link
        className="text-black text-[0.9rem] font-normal select-none cursor-pointer"
        to="/devTeam"
      >
        Designed & Developed By
        <span className="text-[#5a4fcf]"> Ansh</span>,
        <span className="text-[#5a4fcf]"> Daksh</span>,
        <span className="text-[#5a4fcf]"> Deepak </span>&
        <span className="text-[#5a4fcf]"> Harsh</span>
      </Link>
    </div>
  );
};
export default DevFooter;
