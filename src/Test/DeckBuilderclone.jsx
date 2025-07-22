import { supabase } from "../supabase-client";
import { useEffect, useState, } from "react";
import HoverCard from "../components/HoverCard";
import DeckEditor from "./DeckEditorclone";
import Pagination from "./Paginationclone";
import useDeck from "../states/useDeck";
const DeckBuilder = () => {
  const deck = useDeck((state) => state.deck);
  const setDeck = useDeck((state) => state.setDeck);
  const [cards, setCards] = useState([]);
  const [deckList, setDeckList] = useState([]);
  const fetchCards = async () => {
    let fetch = [];
    const { error, data } = await supabase.from("Cards").select("*");
    if (error) {
      console.error("Error Reading", error.message);
      return;
    }
    data.forEach((row) => {
      fetch.push(...row.data);
      if (row.duplicate_cards) {
        fetch.push(...row?.duplicate_cards);
      }
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
  const fetchDecks = async () => {
    let decklist = [];
    const { error, data } = await supabase.from("Decks").select("name,deck");
    if (error) {
      console.error("Error Reading", error.message);
      return;
    }
    data.forEach(row => {
      decklist.push({
        name: row.name,
        deck: row.deck,
      })
    })
    setDeckList(decklist)
  };
  const [draggingCard, setDraggingCard] = useState(null);
  const [hoveredCard, setHoverCard] = useState(null);

  const handleSave = async () => {
    const { error } = await supabase.from("Decks").insert({
      name: name,
      deck: deck,
    });
    if (error) {
      console.error("Error Reading", error.message);
      return;
    }
  };

  useEffect(() => {
    fetchCards();
    fetchDecks();
  }, []);
  useEffect(() => {
    if (deckList[0]?.deck) setDeck(deckList[0].deck);
  }, [deckList]);
  return (
    <>
      <section
        onDragOver={(e) => e.preventDefault()}
        className="flex justify-center mx-15 rounded-xl h-screen select-none bg-red-900 "
      >
        <div className="w-1/4 flex flex-col justify-between align-center m-2">
          <HoverCard hoveredCard={hoveredCard} />
          <section className="">
            <select
              className="w-98/100 py-3 mx-1 px-2 bg-zinc-900 rounded-md"
              onChange={(e) => {
                setDeck(deckList[e.target.value].deck);
              }}
            >
              {deckList.map((deck, idx) => (
                <option key={deck.id} value={idx}>
                  {deck.name}
                </option>
              ))}
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
        <DeckEditor setHoverCard={setHoverCard} draggingCard={draggingCard} setDraggingCard={setDraggingCard} />
        <Pagination cards={cards} onhover={setHoverCard} setDraggingCard={setDraggingCard} />
      </section>
    </>
  );
};

export default DeckBuilder;
