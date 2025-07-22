import HoverCard from "../components/HoverCard"
import DeckEditor from "./DeckEditorclone"
import Pagination from "./Paginationclone"
import { useState } from "react"
const NewDeckBuilder = () => {
  const [cards, setCards] = useState([]);
  return (
    <div className="grid grid-cols-5 w-full h-screen">
      <div className="bg-zinc-900 flex flex-col justify-between">
        <HoverCard />
        <div className="flex justify-center">
          <div className="flex flex-col text-sm w-full">
            <button className="m-1 btn">Import Deck</button>
            <button className="m-1 btn">New Deck</button>
            <button className="m-1 btn">Rename Deck</button>
          </div>
          <div className="flex flex-col text-sm w-full">
            <button className="m-1 btn">Delete Deck</button>
            <button className="m-1 btn" >
              {" "}
              Save Deck
            </button>
            <button className="m-1 btn">Exit</button>
          </div>
        </div>
      </div>
      <div className="col-span-3">
        <DeckEditor />
      </div>
      <div className=" ">
        <Pagination cards={cards} />
      </div>
    </div>
  )
}

export default NewDeckBuilder;
