import { useState } from "react";
import useHover from "../states/useHover";
import useBoard from "../states/useBoard"
const PlayCard = ({ card, from, benchid, selectCard }) => {
  const board = useBoard((state) => state.board)
  let activePokemon = board.active[0].pokemon.length
  const moveCard = useBoard((state) => state.moveCard)
  const evolvePokemon = useBoard((state) => state.evolvePokemon)
  const [hovered, setHovered] = useState(false)
  const setHover = useHover((state) => state.setHover)
  const handleHover = () => {
    setHovered(true);
    setHover(card);
  }
  const handleAttach = () => {
    selectCard(() => ({
      waiting: true,
      from: from,
      cardID: card.id,
    }))
  }
  if (from == "hand") {
    return (
      <div onMouseEnter={handleHover} onMouseLeave={() => setHovered(false)} className="relative flex justify-center cursor-pointer select-none">

        {hovered && (<ul className="absolute bottom-full bg-gray-400 rounded z-50 text-sm whitespace-nowrap w-full">
          <li onClick={() => moveCard(card.id, from, "lost")} className="rounded-b cursor-pointer hover:bg-gray-300">Lost Zone</li>
          <li onClick={() => moveCard(card.id, from, "discard")} className="rounded-t cursor-pointer hover:bg-gray-300 ">Discard</li>
          {card.supertype == 'Pokémon' && card.subtypes[0] == "Basic" && (<li onClick={() => moveCard(card.id, from, "bench")} className=" cursor-pointer hover:bg-gray-300">Play Bench</li>)}
          {activePokemon == 0 && card.supertype == 'Pokémon' && card.subtypes[0] == "Basic" && (<li onClick={() => moveCard(card.id, from, "active")} className="rounded-b cursor-pointer hover:bg-gray-300">Play Active</li>)}
          {activePokemon !== 0 && card.supertype == 'Pokémon' && card.subtypes[0] != "Basic" && (<li onClick={() => evolvePokemon(card.id, from, "active")} className="rounded-b cursor-pointer hover:bg-gray-300">Evolve</li>)}
          {card.supertype == 'Trainer' && card.subtypes[0] != 'Stadium' && (<li onClick={() => moveCard(card.id, from, "play")} className="rounded-b cursor-pointer hover:bg-gray-300">Play </li>)}
          {card.supertype == 'Trainer' && card.subtypes[0] == 'Stadium' && (<li onClick={() => moveCard(card.id, from, "stadium")} className="rounded-b cursor-pointer hover:bg-gray-300">Play Stadium</li>)}
          {card.supertype == 'Energy' && (<li onClick={handleAttach} className="rounded-b cursor-pointer hover:bg-gray-300">Attach Energy</li>)}       </ul>)}
        <img src={card.images.small} alt={card.name} />
      </div>
    )
  }
  if (from == "stadium") {
    return (
      <div onMouseEnter={handleHover} onMouseLeave={() => setHovered(false)} className="cursor-pointer">
        <img src={card.images.small} alt={card.name} />
      </div>
    )
  }
  if (from == "prize") {
    return (
      <div onMouseEnter={handleHover} onMouseLeave={() => setHovered(false)} className="cursor-pointer">
        <img src={card.images.small} alt={card.name} />
      </div>
    )
  }
  if (from == "trainer") {
    return (
      <div onMouseEnter={handleHover} onMouseLeave={() => setHovered(false)} className=" cursor-pointer">
        <img src={card.images.small} alt={card.name} />
      </div>
    )
  }
  if (from == "bench") {
    return (
      <div onMouseEnter={handleHover} onMouseLeave={() => setHovered(false)} className="relative flex justify-center cursor-pointer select-none">
        {hovered && (<ul className="absolute bottom-full bg-gray-400 z-50 text-xs whitespace-nowrap rounded">
          <li onClick={() => moveCard(card.id, from, "discard", benchid)} className="rounded-t cursor-pointer hover:bg-gray-300 p-1">Discard</li>
          <li onClick={() => moveCard(card.id, from, "lost", benchid)} className="rounded-b cursor-pointer hover:bg-gray-300">Lost Zone</li>
          <li onClick={() => moveCard(card.id, from, "hand", benchid)} className="cursor-pointer hover:bg-gray-300 p-1">Add To Hand</li>
          {activePokemon == 0 && (<li onClick={() => moveCard(card.id, "bench", "active", benchid)} className="rounded-b cursor-pointer hover:bg-gray-300 p-1">Move Active</li>)}
        </ul>)}
        <img src={card.images.small} alt={card.name} />
      </div>)

  }
  if (from == "active") {
    return (
      <div onMouseEnter={handleHover} onMouseLeave={() => setHovered(false)} className="relative flex justify-center cursor-pointer select-none">
        {hovered && (<ul className="absolute bottom-full bg-gray-400 z-50 text-xs whitespace-nowrap rounded">
          <li onClick={() => moveCard(card.id, from, "discard")} className="rounded-t cursor-pointer hover:bg-gray-300 p-1">Discard</li>
          <li onClick={() => moveCard(card.id, from, "lost")} className="rounded-b cursor-pointer hover:bg-gray-300">Lost Zone</li>
          <li onClick={() => moveCard(card.id, from, "hand")} className="cursor-pointer hover:bg-gray-300 p-1">Add To Hand</li>
          <li onClick={() => moveCard(card.id, from, "bench")} className="rounded-b cursor-pointer hover:bg-gray-300 p-1">Move Bench</li>
        </ul>)}
        <img src={card.images.small} alt={card.name} />
      </div>

    )
  }
  if (from == "deck") {
    return (
      <div onMouseEnter={handleHover} onMouseLeave={() => setHovered(false)} className="z-50 relative flex justify-center cursor-pointer select-none">
        {hovered && (<ul className="absolute bottom bg-gray-400 text-xs text-center whitespace-nowrap">
          <li onClick={() => moveCard(card.id, from, "discard")} className=" cursor-pointer hover:bg-gray-300 p-1 ">Discard</li>
          <li onClick={() => moveCard(card.id, from, "lost")} className=" cursor-pointer hover:bg-gray-300">Lost Zone</li>
          {card.supertype == 'Pokémon' && (<li onClick={() => moveCard(card.id, from, "bench")} className="cursor-pointer hover:bg-gray-300">Move Bench</li>)}
          <li onClick={() => moveCard(card.id, from, "hand")} className="cursor-pointer hover:bg-gray-300 p-1">Add To Hand</li>
        </ul >)}
        <img src={card.images.small} alt={card.name} />
      </div>)
  }
  if (from == "discard") {
    return (
      <div onMouseEnter={handleHover} onMouseLeave={() => setHovered(false)} className="relative flex justify-center cursor-pointer select-none">
        {hovered && (<ul className="absolute bg-gray-400 text-xs text-center whitespace-nowrap">
          <li onClick={() => moveCard(card.id, from, "hand")} className="cursor-pointer hover:bg-gray-300">Add To Hand</li>
          {card.supertype == 'Pokémon' && (<li onClick={() => moveCard(card.id, from, "bench")} className=" border-b rounded cursor-pointer hover:bg-gray-300">Play Bench</li>)}
          {card.supertype == 'Pokémon' && (<li onClick={() => moveCard(card.id, from, "active")} className=" border-b rounded cursor-pointer hover:bg-gray-300">Play Active</li>)}
        </ul>)}
        <img src={card.images.small} alt={card.name} />
      </div>
    )
  }
  if (from == "lost") {
    return (
      <div onMouseEnter={handleHover} onMouseLeave={() => setHovered(false)} className="relative flex justify-center cursor-pointer select-none">
        {hovered && (<ul className="absolute bg-gray-400 text-xs text-center whitespace-nowrap">
          <li onClick={() => moveCard(card.id, from, "hand")} className="cursor-pointer hover:bg-gray-300">Add To Hand</li>
          {card.supertype == 'Pokémon' && (<li onClick={() => moveCard(card.id, from, "bench")} className=" border-b rounded cursor-pointer hover:bg-gray-300">Play Bench</li>)}
          {card.supertype == 'Pokémon' && (<li onClick={() => moveCard(card.id, from, "active")} className=" border-b rounded cursor-pointer hover:bg-gray-300">Play Active</li>)}
        </ul>)}
        <img src={card.images.small} alt={card.name} />
      </div>
    )
  }
};
export default PlayCard;
