import React, { useState } from "react";
import { fetcher } from "../libs/fetcher";
import useSWR from "swr";

interface Page {
  index: number;
  key: number;
  type: string;
}
const Page: React.FC<Page> = (props): JSX.Element => {
  interface Characters {
    id: number;
    name: string;
    image: string;
  }

  const baseUrl = "https://rickandmortyapi.com/api/";

  const { data, error, isLoading } = useSWR(
    `${baseUrl}${props.type}?page=${props.index}&limit=10`,
    fetcher
  );

  console.log("props.index", props.index);
  console.log("data", data);

  if (error) return <div>error to fetch data</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      {data &&
        data.results.map((item: Characters) => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} />
            <h1>{item.name}</h1>
          </div>
        ))}
    </div>
  );
};

export default Page;
