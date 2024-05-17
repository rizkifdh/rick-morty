import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="flex items-center justify-center min-h-screen text-3xl text-dead">
      Error fetching data {":("}
      <Link to="/" className="text-alive text-md cursor-pointer">
        back to homepage
      </Link>
    </div>
  );
};

export default Error;
