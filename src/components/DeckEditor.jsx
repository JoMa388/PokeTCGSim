import { useState } from "react";
import useDeck from "../states/useDeck";
const DeckEditor = ({ setHoverCard, setDeckCards }) => {
  const deck = useDeck((state) => state.deck);
  const addCard = useDeck((state) => state.addCard);
  const removeCard = useDeck((state) => state.removeCard);
  return (
    <>
      <div className="grid grid-cols-10 grid-rows-6 w-[1000px] rounded-lg mx-1 m-1">
        {deck.map((card, idx) => (
          <div
            key={idx}
            onContextMenu={(e) => {
              e.preventDefault();
              removeCard(idx);
            }}
            className="w-full h-full border border-black rounded bg-green-900 flex items-center justify-center"
            onMouseEnter={() => card && setHoverCard(card)}
          >
            {card ? <img src={card.images.small} alt={card.name} className="" /> : <span className="text-white text-xs"></span>}
          </div>
        ))}
      </div>
    </>
  );
};
export default DeckEditor;
