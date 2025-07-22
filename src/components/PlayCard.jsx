import { useState } from "react";
import useHover from "../states/useHover";
import useBoard from "../states/useBoard"
const PlayCard = ({ card, from, activeSize }) => {
  const moveCard = useBoard((state) => state.moveCard)
  const [hovered, setHovered] = useState(false)
  const setHover = useHover((state) => state.setHover)
  const handleHover = () => {
    setHovered(true);
    setHover(card);
    console.log(activeSize)
  }
  return (
    <div onMouseEnter={handleHover} onMouseLeave={() => setHovered(false)} className="cursor-pointer select-none">
      {hovered && (
        <div className="relative flex flex-col items-center">
          {from == "hand" && (<ul className="absolute bottom-full bg-gray-400 rounded z-50 text-sm whitespace-nowrap w-full">
            <li onClick={() => moveCard(card.id, from, "discard")} className="rounded-t cursor-pointer hover:bg-gray-300 ">Discard</li>
            <li onClick={() => moveCard(card.id, from, "lost")} className="rounded-b cursor-pointer hover:bg-gray-300">Lost Zone</li>
            {card.supertype == 'Pokémon' && (<li onClick={() => moveCard(card.id, from, "bench")} className=" cursor-pointer hover:bg-gray-300">Play Bench</li>)}
            {activeSize == 0 && card.supertype == 'Pokémon' && (<li onClick={() => moveCard(card.id, from, "active")} className="rounded-b cursor-pointer hover:bg-gray-300">Play Active</li>)}
            {card.supertype == 'Trainer' && card.subtypes[0] != 'Stadium' && (<li onClick={() => moveCard(card.id, from, "play")} className="rounded-b cursor-pointer hover:bg-gray-300">Play </li>)}
            {card.supertype == 'Trainer' && card.subtypes[0] == 'Stadium' && (<li onClick={() => moveCard(card.id, from, "stadium")} className="rounded-b cursor-pointer hover:bg-gray-300">Play Stadium</li>)}
          </ul>)}
          {from == "discard" && (<ul className="absolute bottom-full bg-gray-400 rounded z-50 text-xs whitespace-nowrap">
            <li onClick={() => moveCard(card.id, from, "hand")} className="px-4 border-b rounded cursor-pointer hover:bg-gray-300">Add To Hand</li>
            {card.supertype == 'Pokémon' && (<li onClick={() => moveCard(card.id, from, "bench")} className=" border-b rounded cursor-pointer hover:bg-gray-300">Play Bench</li>)}
            {card.supertype == 'Pokémon' && (<li onClick={() => moveCard(card.id, from, "active")} className=" border-b rounded cursor-pointer hover:bg-gray-300">Play Active</li>)}
          </ul>)}
          {from == "bench" && (<ul className="absolute bottom-full bg-gray-400 z-50 text-xs whitespace-nowrap rounded">
            <li onClick={() => moveCard(card.id, from, "discard")} className="rounded-t cursor-pointer hover:bg-gray-300 p-1">Discard</li>
            <li onClick={() => moveCard(card.id, from, "lost")} className="rounded-b cursor-pointer hover:bg-gray-300">Lost Zone</li>
            <li onClick={() => moveCard(card.id, from, "hand")} className="cursor-pointer hover:bg-gray-300 p-1">Add To Hand</li>
            {activeSize == 0 && (<li onClick={() => moveCard(card.id, from, "active")} className="rounded-b cursor-pointer hover:bg-gray-300 p-1">Move Active</li>)}
          </ul>)}
          {from == "active" && (<ul className="absolute bottom-full bg-gray-400 z-50 text-xs whitespace-nowrap rounded">
            <li onClick={() => moveCard(card.id, from, "discard")} className="rounded-t cursor-pointer hover:bg-gray-300 p-1">Discard</li>
            <li onClick={() => moveCard(card.id, from, "lost")} className="rounded-b cursor-pointer hover:bg-gray-300">Lost Zone</li>
            <li onClick={() => moveCard(card.id, from, "hand")} className="cursor-pointer hover:bg-gray-300 p-1">Add To Hand</li>
            <li onClick={() => moveCard(card.id, from, "bench")} className="rounded-b cursor-pointer hover:bg-gray-300 p-1">Move Bench</li>
          </ul>)}
          {from == "deck" && (<ul className="z-[100] absolute bottom-full bg-gray-400 text-xs text-center whitespace-nowrap">
            <li onClick={() => moveCard(card.id, from, "discard")} className=" cursor-pointer hover:bg-gray-300 p-1 ">Discard</li>
            <li onClick={() => moveCard(card.id, from, "lost")} className=" cursor-pointer hover:bg-gray-300">Lost Zone</li>
            <li onClick={() => moveCard(card.id, from, "hand")} className="cursor-pointer hover:bg-gray-300 p-1">Add To Hand</li>
            {card.supertype == 'Pokémon' && (<li onClick={() => moveCard(card.id, from, "bench")} className=" border-b rounded cursor-pointer hover:bg-gray-300">Move Bench</li>)}
          </ul>)}
        </div>
      )}
      <img src={card.images.small} alt={card.name} />
    </div>
  );
};
export default PlayCard;
