import { supabase } from "../supabase-client";
import { useEffect, useState } from "react";
import HoverCard from "../components/HoverCard";
import DeckEditor from "../components/DeckEditor";
import Pagination from "../components/Pagination";
const DeckBuilder = () => {
  const [cards, setCards] = useState([]);
  const fetchCards = async () => {
    let fetch = [];
    const { error, data } = await supabase.from("Cards").select("*");
    if (error) {
      console.error("Error Reading", error.message);
      return;
    }
    data.forEach((row) => {
      fetch.push(...row.data);
      fetch.push(...row.duplicate_cards);
    });
    const seen = new Set();
    const deduped = fetch.filter((card) => {
      if (seen.has(card.id)) return false;
      seen.add(card.id);
      return true;
    });
    deduped.sort((a, b) => a.name.localeCompare(b.name));
    setCards(deduped);
  };
  const [hoveredCard, setHoverCard] = useState(null);
  useEffect(() => {
    fetchCards();
  }, []);
  return (
    <>
      <section className="flex justify-center mx-30 rounded-xl min-h-screen" style={{ backgroundColor: "#660000" }}>
        <div className="w-80 mr-2 mt-2 flex flex-col justify-between align-center">
          <HoverCard hoveredCard={hoveredCard} />
          <section className="">
            <select id="" className=" w-full py-3 mx-1 mr-2 bg-zinc-900 rounded-md">
              <option value="" className="absolute -bottom-400px"></option>
            </select>
            <div className="flex justify-center">
              <div className="flex flex-col text-sm w-full">
                <button className="m-1 btn">Import Deck</button>
                <button className="m-1 btn">New Deck</button>
                <button className="m-1 btn">Rename Deck</button>
              </div>
              <div className="flex flex-col text-sm w-full">
                <button className="m-1 btn">Delete Deck</button>
                <button className="m-1 btn"> Save Deck</button>
                <button className="m-1 btn">Exit</button>
              </div>
            </div>
          </section>
        </div>
        <DeckEditor setHoverCard={setHoverCard} />
        <Pagination cards={cards} onhover={setHoverCard} />
      </section>
    </>
  );
};

export default DeckBuilder;
