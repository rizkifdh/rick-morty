import React from "react";
import { fetcher } from "../libs/fetcher";
import useSWR from "swr";
import { Link } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";

interface PageProps {
  index: number;
}

interface EpisodeProps {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

const EpisodePage: React.FC<PageProps> = ({ index }) => {
  const baseUrl = "https://rickandmortyapi.com/api/";

  const { data, error, isLoading } = useSWR(
    `${baseUrl}episode?page=${index}&limit=10`,
    fetcher
  );

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className="md:grid md:grid-cols-2 gap-5 xl:grid-cols-4">
      {data &&
        data.results.map((item: EpisodeProps) => (
          <div className="pb-10" key={item.id}>
            <div className="card card-side card-bordered bg-base-100 shadow-xl">
              <div className="card-body p-2 w-36 text-sm text-left">
                <div className="card-title line-clamp-1 text-primary">
                  Title : {item.name}
                </div>
                <div>air date : {item.air_date}</div>
                <div>episode : {item.episode}</div>
                <Link
                  to={`/episode/${item.id}`}
                  className="pt-3 cursor-pointer"
                >
                  Click for more detail
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EpisodePage;
