import { useState } from "react";
import LocationPage from "./components/LocationPage";

function Location() {
  const [pageIndex, setPageIndex] = useState(1);

  const pages = [];
  for (let i = 1; i <= pageIndex; i++) {
    pages.push(<LocationPage key={i} index={i} />);
  }

  return (
    <>
      <div className="text-xl text-center p-5">
        {pages}
        <button onClick={() => setPageIndex(pageIndex + 1)}>Load More</button>
      </div>
    </>
  );
}

export default Location;
