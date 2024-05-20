import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "./libs/fetcher";
import { Link } from "react-router-dom";
import Error from "./components/Error";
import Loading from "./components/Loading";
import { apiUrl } from "./libs/api-url";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
} from "@material-tailwind/react";
import BackButton from "./components/BackButton";

function EpisodebyCharacter() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSWR(
    `${apiUrl}/character/${id}`,
    fetcher
  );

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  console.log("data", data);
  return (
    <>
      <div className="flex flex-col p-5 gap-4 md:gap-7">
        <BackButton />
        <div className="flex flex-col items-center gap-4 md:gap-5">
          <img
            src={data.image}
            alt={data.name}
            className="w-[200px] md:w-[300px] rounded-3xl"
          />
          <div className="flex text-3xl md:text-7xl text-primary text-center justify-center">
            {data.name}
          </div>
          <div className="md:text-3xl">species : {data.species}</div>
          <div className="md:text-3xl">status : {data.status}</div>
        </div>
        <p className="md:text-xl text-center">appear in episode :</p>
        <Timeline className="items-center">
          {data.episode.map((eps: string) => {
            const episodeId = eps.split("/").pop();
            return (
              <Link to={`/episode/${episodeId}`} key={eps}>
                <TimelineItem>
                  <TimelineConnector />
                  <TimelineHeader className="h-3">
                    <TimelineIcon className="bg-base-content" />
                    <div color="blue-gray" className="md:text-xl">
                      episode {episodeId}
                    </div>
                  </TimelineHeader>
                  <TimelineBody className="pb-8" />
                </TimelineItem>
              </Link>
            );
          })}
        </Timeline>
      </div>
    </>
  );
}

export default EpisodebyCharacter;
