import React from "react";
import { fetcher } from "../libs/fetcher";
import useSWR from "swr";
import { Link } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";
import { apiUrl } from "../libs/api-url";

interface PageProps {
  index: number;
}

interface LocationProps {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

const LocationPage: React.FC<PageProps> = ({ index }) => {
  const { data, error, isLoading } = useSWR(
    `${apiUrl}location?page=${index}&limit=10`,
    fetcher
  );

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <div className="md:grid md:grid-cols-2 gap-5 xl:grid-cols-4">
      {data &&
        data.results.map((item: LocationProps) => (
          <div className="pb-10" key={item.id}>
            <div className="card card-side card-bordered bg-base-100 shadow-xl">
              <div className="card-body p-2 w-36 text-sm text-left">
                <div className="card-title line-clamp-1 text-primary">
                  {item.name}
                </div>
                <div>type : {item.type}</div>
                <div>dimension : {item.dimension}</div>
                <div>population : {item.residents.length}</div>
                <Link
                  to={`/location/${item.id}`}
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

export default LocationPage;
