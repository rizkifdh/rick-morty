import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "./libs/fetcher";
import { useState, useEffect } from "react";
import { ModalCharacter } from "./components/ModalCharacter";
import Error from "./components/Error";
import Loading from "./components/Loading";
import { apiUrl } from "./libs/api-url";
import BackButton from "./components/BackButton";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Avatar,
} from "@material-tailwind/react";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  gender: string;
  origin: {
    name: string;
  };
}

function EpisodeById() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSWR(`${apiUrl}/episode/${id}`, fetcher);

  const [characters, setCharacters] = useState<Character[]>([]);

  const [selectedId, setselectedId] = useState<number | null>(null);

  useEffect(() => {
    if (data && data.characters) {
      const fetchCharacters = async () => {
        const characterPromises = data.characters.map((url: string) =>
          fetch(url).then((res) => res.json())
        );
        const charactersData = await Promise.all(characterPromises);
        setCharacters(charactersData);
      };
      fetchCharacters();
    }
  }, [data]);

  const handleCharacterClick = (id: number) => {
    setselectedId(id);
    const modalElement = document.getElementById("modal_character");
    if (modalElement instanceof HTMLDialogElement) {
      modalElement.showModal();
    }
  };

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  console.log("data", characters);

  return (
    <>
      <div className="flex flex-col p-5">
        <BackButton />
        <div className="flex flex-col text-lg gap-1 pt-5">
          <div className="text-primary text-4xl tracking-widest">
            {data.name}
          </div>
          <div>air date : {data.air_date}</div>
          <div>episode : {data.episode}</div>
          <div className="pb-6">
            {data.characters.length} characters appear in this episode
          </div>
        </div>
        <Timeline className="">
          {characters.map((char: Character) => {
            return (
              <TimelineItem
                onClick={() => handleCharacterClick(char.id)}
                className="cursor-pointer"
              >
                <TimelineConnector />
                <TimelineHeader className="">
                  <TimelineIcon className="p-0">
                    <Avatar
                      size="xl"
                      src={char.image}
                      alt={char.name}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                  </TimelineIcon>
                  {char.name}
                </TimelineHeader>
                <TimelineBody className="pb-10">
                  <div>
                    <p>gender : {char.gender}</p>
                    <p>status : {char.status}</p>
                    <p>origin : {char.origin.name}</p>
                  </div>
                </TimelineBody>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
      <dialog id="modal_character" className="modal">
        <div className="modal-box p-0 h-3/4">
          {selectedId && <ModalCharacter itemId={selectedId} />}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default EpisodeById;
