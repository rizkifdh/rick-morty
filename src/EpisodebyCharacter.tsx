import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "./libs/fetcher";
import { Link } from "react-router-dom";
import Error from "./components/Error";
import Loading from "./components/Loading";

function EpisodebyCharacter() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSWR(
    `https://rickandmortyapi.com/api/character/${id}`,
    fetcher
  );

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex flex-row p-5 gap-10">
        <div className="flex flex-col w-1/2 lg:w-1/3 gap-2">
          <img src={data.image} alt={data.name} className="w-full" />
          <div className="flex text-3xl md:text-7xl text-primary text-center justify-center">
            {data.name}
          </div>
        </div>
        <div className="flex flex-col md:text-3xl md:gap-4">
          <div className="">appear in episode :</div>
          {data.episode.map((eps: string) => {
            const episodeId = eps.split("/").pop();
            return (
              <Link to={`/episode/${episodeId}`} key={eps}>
                Episode {episodeId}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default EpisodebyCharacter;
