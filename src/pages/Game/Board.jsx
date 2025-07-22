import { supabase } from "../../supabase-client";
import { useEffect, useState } from "react";
import PlayCard from "../../components/PlayCard.jsx";
import CardBack from "../../assets/cardback.png"
import Deck from "./components/Deck.jsx"
import Modal from "./components/Modal.jsx"
import Discard from "./components/Discard.jsx"
import useBoard from "../../states/useBoard.js"
const Board = () => {
  const board = useBoard((state) => state.board)
  const setArray = useBoard((state) => state.setArray)
  const moveCard = useBoard((state) => state.moveCard)
  const mulligan = useBoard((state) => state.mulligan)
  const [openModal, setModal] = useState({
    lost: false,
    discard: false,
    prize: false,
    deck: false,
  });
  const fetchDeck = async () => {
    const { error, data } = await supabase.from("Decks").select("*").limit(1);
    if (error) {
      console.error("Error Reading", error.message);
      return;
    }
    const fetchedDeck = data[0].deck;
    const uniqueDeck = fetchedDeck.map((card, index) => ({
      ...card,
      id: `${card.id}-${index}`
    }))
    setArray("deck", uniqueDeck);
    mulligan();
  };
  useEffect(() => {
    fetchDeck()
  }, []);
  return (
    <div className="h-full flex flex-col mt-auto justify-end text-center overflow-hidden select-none" onDragStart={(e) => e.preventDefault()}>
      <div className="h-1/10">
        <button onClick={() => mulligan()}>Test</button>
      </div>
      {/* Opp Board */}
      <div className="h-4/10 grid grid-cols-5">
      </div>
      <div className="h-1/10 rounded-lg "></div>
      {/* Player Board */}
      <div className="h-4/10 grid grid-cols-5 grid-rows-2 mr-3">
        <div className="col-span-5 flex justify-between mb-4">
          {/* Lost Zone */}
          <div className="h-full w-1/8 border-3 border-purple-900 rounded-md flex justify-center">
            {board.lost.length > 0 && (<div onClick={() => setModal((prev) => ({ ...prev, lost: true }))} className="h-full w-9/10">
              <Discard array={board.lost} />
            </div>)}
            {openModal.lost &&
              (<Modal array={board.lost} closeModal={() => setModal((prev) => ({ ...prev, lost: false }))} label={"Viewing Lost Zone"} />)
            }
          </div>
          {/* Stadium */}
          <div className="h-full w-1/8 border-3 border-blue-900 rounded-md -mt-20 flex justify-center">
            {board.stadium.length > 0 && (() => {
              const card = board.stadium.at(-1);
              return (
                <div className="h-full w-9/10 " onClick={() => moveCard(card.id, "stadium", "discard")}>
                  <PlayCard card={card} />
                </div>
              )
            })()}
          </div>
          {/* Active */}
          <div className="h-full w-1/8 border-3 border-green-900 rounded-md -mt-10 flex justify-center">
            {/* <div className="relative h-full w-9/10">
              <img src="https://images.pokemontcg.io/sv5/123.png" className="absolute z-10" />
              <img src="https://images.pokemontcg.io/sv1/258.png" className="absolute translate-x-4 z-9" />
              <img src="https://images.pokemontcg.io/ex16/106_hires.png" className="absolute translate-x-8 z-8" />
              <img src="https://images.pokemontcg.io/ex16/106_hires.png" className="absolute translate-x-12 z-7" />
            </div> */}
            {board.active.map((card) => (
              <div className="relative h-full w-9/10">
                <PlayCard card={card} from="active" />
              </div>
            ))}
          </div>
          {/* Play Trainer */}
          <div className="h-full w-1/8 border-3 border-green-900 rounded-md -mt-10 flex justify-center">
            {board.play.length > 0 && (() => {
              const card = board.play.at(-1);
              return (
                <div className="h-full w-9/10" onClick={() => moveCard(card.id, "play", "discard")}>
                  <PlayCard card={card} />
                </div>
              )
            })()}
          </div>
          {/* Deck */}
          <div className="h-full w-1/8 border-3 border-green-900 rounded-md ">
            <Deck deck={board.deck} view={() => setModal((prev) => ({ ...prev, deck: true }))} />
            {openModal.deck &&
              (<Modal array={board.deck} from="deck" closeModal={() => setModal((prev) => ({ ...prev, deck: false }))} label={"Viewing Deck"} />)
            }
          </div>
        </div>
        <div className="col-span-5 flex justify-evenly mb-6">
          {/* Prize */}
          <div className="h-full w-2/8 border-3 border-green-900 rounded-md ml-1 ">
            <div className="flex items-center">
              {board.prize.map((_, i) => (
                < img key={i + "p"} src={CardBack} className={`h-full w-full ${i !== 0 ? "-ml-14" : ""}`} />
              ))
              }
            </div>
          </div>
          {/* Bench */}
          <div className="h-full w-5/8 border-3 border-green-900 rounded-md ml-1 flex justify-start">
            {/* <div className="relative h-full w-1/6 ml-3">
              <img src="https://images.pokemontcg.io/sv6/211.png" className="absolute z-10" />
              <img src="https://images.pokemontcg.io/sv2/278.png" className="absolute -translate-y-4 z-9" />
              <img src="https://images.pokemontcg.io/sv2/278.png" className="absolute -translate-y-8 z-0 " />
            </div> */}
            {board.bench.map((card) => (
              <div className="relative h-full w-1/6 ml-3">
                <PlayCard card={card} from="bench" activeSize={board.active.length} />
              </div>
            ))}
          </div>
          {/* Trash */}
          <div className="h-full w-1/8 border-3 border-green-900 rounded-md ml-1 flex justify-center items-center ">
            {board.discard.length > 0 && (<div onClick={() => setModal((prev) => ({ ...prev, discard: true }))} className="h-full w-9/10">
              <Discard array={board.discard} />
            </div>)}
            {openModal.discard &&
              (<Modal array={board.discard} from="discard" closeModal={() => setModal((prev) => ({ ...prev, discard: false }))} label={"Viewing Discard"} />)
            }
          </div>
        </div>
      </div>
      <div className=" h-1/10 flex justify-center touch-none">
        {board.hand.map((card, i) => (
          <div key={card.id} className={`relative w-15/100 ${i !== 0 ? "-ml-9" : ""} -translate-y-9 transition-transform hover:-translate-y-23 duration-200 z-11`}>
            <PlayCard card={card} from="hand" activeSize={board.active.length} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Board;
