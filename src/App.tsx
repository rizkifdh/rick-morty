import { useState } from "react";

import Page from "./components/Page";
function App() {
  const [pageIndex, setpageIndex] = useState(1);

  const pages = [];

  for (let i = 1; i < pageIndex; i++) {
    pages.push(<Page index={i} key={i} type="character" />);
  }

  return (
    <>
      <div className="text-xl text-center" id="root">
        {pages.length < 1 ? <Page index={1} key={1} type="character" /> : pages}
        <button onClick={() => setpageIndex(pageIndex + 1)}>Load More</button>
      </div>
    </>
  );
}

export default App;
