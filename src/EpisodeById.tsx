import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "./libs/fetcher";
import { useState, useEffect } from "react";
import { ModalCharacter } from "./components/ModalCharacter";
import Error from "./components/Error";
import Loading from "./components/Loading";

interface Character {
  id: number;
  name: string;
  image: string;
}

function EpisodeById() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSWR(
    `https://rickandmortyapi.com/api/episode/${id}`,
    fetcher
  );

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

  return (
    <>
      <div className="flex flex-col p-5">
        <div className="flex flex-col text-lg gap-1">
          <div className="text-primary text-4xl tracking-widest">
            {data.name}
          </div>
          <div>air date : {data.air_date}</div>
          <div>episode : {data.episode}</div>
          <div className="pb-6">
            {data.characters.length} characters appear in this episode
          </div>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {characters.map((character) => (
            <li
              key={character.id}
              className="flex flex-col items-center"
              onClick={() => handleCharacterClick(character.id)}
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-24 h-24 rounded-full"
              />
              <div className="text-center">{character.name}</div>
            </li>
          ))}
        </ul>
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
