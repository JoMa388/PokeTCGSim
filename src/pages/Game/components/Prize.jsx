import useBoard from "../../../states/useBoard"
import CardBack from "../../../assets/cardback.png"
import { useState } from "react"
const Prize = ({ view }) => {
  const [hover, setHovered] = useState(false)
  const board = useBoard((state) => state.board)
  const lastPrizeCard = board.prize.at(-1)
  const moveCard = useBoard((state) => state.moveCard)
  return (
    <>
      {board.prize.length > 0 && (
        <div className=" relative flex flex-col items-center overflow-visible h-full w-full" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {hover && (
            <ul className="absolute bottom-full bg-gray-400 rounded text-sm whitespace-nowrap">
              <li onClick={view} className="rounded hover:bg-gray-300 cursor-pointer">View</li>
              <li onClick={() => moveCard(lastPrizeCard.id, "prize", "hand")} className="rounded px-3 hover:bg-gray-300 cursor-pointer">Take Prize</li>
            </ul>
          )}
          <div className="relative h-full w-9/10">
            < img src={CardBack} className="h-full " />
          </div>
          <p className="absolute text-3xl font-bold translate-y-9/10">{board.prize.length}</p>
        </div>
      )}
    </>
  )
}

export default Prize
