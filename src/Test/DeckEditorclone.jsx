import { useState } from "react";
import useDeck from "../states/useDeck";
const DeckEditor = ({ setHoverCard, setDeckCards, draggingCard, setDraggingCard }) => {
  const [dragSourceIndex, setDragSourceIndex] = useState(null);
  const deck = useDeck((state) => state.deck);
  const addCard = useDeck((state) => state.addCard);
  const moveCard = useDeck((state) => state.moveCard);
  const removeCard = useDeck((state) => state.removeCard);
  const handleDrop = (idx) => {
    if (draggingCard !== null && dragSourceIndex !== null) {
      moveCard(dragSourceIndex, idx);
      setDraggingCard(null);
      setDragSourceIndex(null);
    } else {
      addCard(draggingCard, idx);
      setDraggingCard(null);
    }
  };
  return (
    <div className="grid grid-cols-10 grid-rows-7 w-2/3 p-2 bg-zinc-900 rounded-lg m-2">
      <div className="col-span-10 bg--800 rounded-t-lg mt-2"></div>
      {deck.map((card, idx) => (
        <div
          key={idx}
          onDragStart={() => {
            setDraggingCard(card);
            setDragSourceIndex(idx);
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(idx)}
          onContextMenu={(e) => {
            e.preventDefault();
            removeCard(idx);
          }}
          className="border border-black rounded bg-green-900 flex flex-col justify-center"
          onMouseEnter={() => card && setHoverCard(card)}
        >
          {card ? <img src={card.images.small} alt={card.name} className="cursor-pointer" /> : <span className="text-white text-xs"></span>}
        </div>
      ))}
    </div>
  );
};
export default DeckEditor;
