import { useState } from "react";
import CharacterPage from "./components/CharacterPage";
import { ModalCharacter } from "./components/ModalCharacter";

function Character() {
  const [pageIndex, setPageIndex] = useState(1);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleItemClick = (id: number) => {
    setSelectedItemId(id);
    const modalElement = document.getElementById("modal_character");
    if (modalElement instanceof HTMLDialogElement) {
      modalElement.showModal();
    }
  };

  const pages = [];
  for (let i = 1; i <= pageIndex; i++) {
    pages.push(
      <CharacterPage key={i} index={i} onItemClick={handleItemClick} />
    );
  }

  return (
    <div className="w-full p-3">
      <div className="text-xl text-center">
        {pages}
        <button onClick={() => setPageIndex(pageIndex + 1)}>Load More</button>
      </div>
      <dialog id="modal_character" className="modal">
        <div className="modal-box p-0 h-3/4 xp:h-2/3">
          {selectedItemId && <ModalCharacter itemId={selectedItemId} />}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default Character;
