import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "./libs/fetcher";
import { useState } from "react";
import { ModalCharacter } from "./components/ModalCharacter";
import { apiUrl } from "./libs/api-url";
import Error from "./components/Error";
import Loading from "./components/Loading";
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
  gender: string;
  status: string;
  origin: {
    name: string;
  };
}

const fetchMultiple = async (urls: string[]): Promise<Character[]> => {
  const fetchPromises = urls.map((url) => fetcher(url));
  return Promise.all(fetchPromises);
};

function LocationById() {
  const { id } = useParams<{ id: string }>();
  const {
    data: locationData,
    isLoading: isLocationLoading,
    error: locationError,
  } = useSWR(`${apiUrl}/location/${id}`, fetcher);

  const characterUrls = locationData?.residents || [];

  const {
    data: charactersData,
    isLoading: isCharactersLoading,
    error: charactersError,
  } = useSWR(
    () => (characterUrls.length > 0 ? characterUrls : null),
    fetchMultiple
  );

  const isLoading = isLocationLoading || isCharactersLoading;
  const error = locationError || charactersError;

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCharacterClick = (id: number) => {
    setSelectedId(id);
    const modalElement = document.getElementById("modal_character");
    if (modalElement instanceof HTMLDialogElement) {
      modalElement.showModal();
    }
  };

  if (error) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex flex-col p-5">
        <BackButton />
        <div className="flex flex-col text-lg gap-1 pb-3 pt-5">
          <div className="text-primary text-4xl tracking-widest">
            {locationData.name}
          </div>
          <div>type : {locationData.type}</div>
          <div>dimension : {locationData.dimension}</div>
          <div>total population : {locationData.residents.length}</div>
          <div className="pt-3">residents: {charactersData?.length}</div>
        </div>
        <Timeline className="">
          {charactersData &&
            charactersData.map((char: Character) => {
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
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
}

export default LocationById;
