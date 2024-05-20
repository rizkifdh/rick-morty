import useSWR from "swr";
import { fetcher } from "../libs/fetcher";
import { Link } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";
import { apiUrl } from "../libs/api-url";

export const ModalCharacter: React.FC<{ itemId: number }> = ({ itemId }) => {
  const { data, error, isLoading } = useSWR(
    `${apiUrl}/character/${itemId}`,
    fetcher
  );

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
      <figure className="h-2/5">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body md:text-xl">
        <div className="text-4xl text-primary">{data.name}</div>
        <div>Gender : {data.gender}</div>
        <div>species : {data.species}</div>
        <div>
          status :{" "}
          <span
            className={`${data.status === "Alive" ? "text-alive" : data.status === "Dead" ? "text-dead" : ""}`}
          >
            {data.status}
          </span>
        </div>
        <div>type : {data.type ? data.type : "unknown"}</div>
        <Link
          to={`${data.origin.url ? `/location/${data.origin.url.split("/").pop()}` : ""}`}
        >
          origin : {data.origin.name}
        </Link>
        <Link
          to={`${data.location.url ? `/location/${data.location.url.split("/").pop()}` : ""}`}
        >
          location : {data.location.name}
        </Link>
        <Link to={`/character/episode/${data.id}`}>
          appear in total {data.episode.length} episode (click to see)
        </Link>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </div>
    </>
  );
};
