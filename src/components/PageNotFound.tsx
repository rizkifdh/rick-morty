import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen text-3xl text-dead">
      404 | page not found
      <Link to="/" className="text-alive text-md cursor-pointer">
        back to homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
