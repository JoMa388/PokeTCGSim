import { useState } from "react"
import CardBack from "../../../assets/cardback.png"
import useBoard from "../../../states/useBoard"
const Deck = ({ deck, view }) => {
  const shuffle = useBoard((state) => state.shuffleArray)
  const drawCards = useBoard((state) => state.drawCards)

  const [hover, setHovered] = useState(false)
  return (
    <>
      {deck.length > 0 && (
        <div className=" relative flex flex-col items-center overflow-visible h-full w-full" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {hover && (
            <ul className="absolute bottom-full bg-gray-400 rounded ">
              <li onClick={view} className="px-4 border-b hover:bg-gray-300 rounded cursor-pointer">View</li>
              <li onClick={() => shuffle("deck")} className="px-4 border-b hover:bg-gray-300 rounded cursor-pointer">Shuffle</li>
              <li onClick={() => drawCards(1)} className="px-4 border-b hover:bg-gray-300 rounded cursor-pointer">Draw </li>
            </ul>
          )}
          <div className="relative h-full w-9/10">
            {deck.map((card, i) => (
              < img key={i + card.id} src={CardBack} className="h-full absolute" style={{ transform: `translateX(${i * 0.02}rem)` }} />
            ))}
          </div>
          <p className="absolute text-3xl font-bold translate-y-9/10">{deck.length}</p>
        </div>
      )}
    </>
  )
}

export default Deck
