import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "./libs/fetcher";
import { useState, useEffect } from "react";
import { ModalCharacter } from "./components/ModalCharacter";

interface Character {
  id: number;
  name: string;
  image: string;
}

function LocationById() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useSWR(
    `https://rickandmortyapi.com/api/location/${id}`,
    fetcher
  );

  const [characters, setCharacters] = useState<Character[]>([]);

  const [selectedId, setselectedId] = useState<number | null>(null);

  useEffect(() => {
    if (data && data.residents) {
      const fetchCharacters = async () => {
        const characterPromises = data.residents.map((url: string) =>
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

  if (error) return <div>Error loading data</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col p-5">
        <div className="flex flex-col text-lg gap-1 pb-3">
          <div className="text-primary text-4xl tracking-widest">
            {data.name}
          </div>
          <div>type : {data.type}</div>
          <div>dimension : {data.dimension}</div>
          <div>total population : {data.residents.length}</div>
          <div className="pt-3">residents: </div>
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

export default LocationById;
