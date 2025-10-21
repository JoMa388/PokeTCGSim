// Import the SDK in ESM/TypeScript
import { useEffect, useState } from "react";
const Add = () => {
  const [cards, setCards] = useState([])
  const fetchCards = async () => {
  }

  useEffect(() => {
    fetchCards()
  }, [])
  return (
    <div className="">
      {cards.map((card) => (
        <div key={card.id}>
          <img src={card.image} alt="" />
        </div>
      ))}
    </div>
  )
}

export default Add
