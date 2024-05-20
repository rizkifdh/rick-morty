import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function BackButton() {
  const navigate = useNavigate();
  return (
    <button className="btn btn-circle btn-outline" onClick={() => navigate(-1)}>
      <IoChevronBackSharp className="w-6 h-6" />
    </button>
  );
}

export default BackButton;
