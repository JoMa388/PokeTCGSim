// Import the SDK in ESM/TypeScript
import TCGdex, { Query } from '@tcgdex/sdk'
const tcgdex = new TCGdex('en');
import { useEffect, useState } from "react";

const Admin = () => {
  const [cards, setCards] = useState([])
  const fetchCards = async () => {
    const list = await tcgdex.card.list(Query.create().equal("name", "Iono"))
    console.log(list)
    setCards(list)
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

export default Admin
