import { supabase } from "../../supabase-client";
import { useEffect, useState } from "react";
import PlayCard from "../../components/PlayCard.jsx";
import Deck from "./components/Deck.jsx"
import Modal from "./components/Modal.jsx"
import Discard from "./components/Discard.jsx"
import Prize from "./components/Prize.jsx"
import useBoard from "../../states/useBoard.js"
const Board = () => {
  const board = useBoard((state) => state.board)
  const setArray = useBoard((state) => state.setArray)
  const moveCard = useBoard((state) => state.moveCard)
  const moveEnergy = useBoard((state) => state.moveEnergy)
  const mulligan = useBoard((state) => state.mulligan)
  const [openModal, setModal] = useState({
    lost: false,
    discard: false,
    prize: false,
    deck: false,
  });
  const [selectedCard, setSelectedCard] = useState({
    waiting: false,
    from: "",
    cardID: "",
  })
  const handleEnergy = (index, to) => {
    if (selectedCard.waiting == false) {
      return
    };
    moveEnergy(selectedCard.cardID, selectedCard.from, to, index)
    setSelectedCard(() => ({
      waiting: false,
      from: "",
      cardID: "",
    }))
  }
  const fetchDeck = async () => {
    const { error, data } = await supabase.from("Decks").select("*").eq("Default", true);
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
      </div>
      {/* Opp Board */}
      <div className="h-4/10 grid grid-cols-5">
      </div>
      <div className="h-1/10 rounded-lg "></div>
      {/* Player Board */}
      <div className="h-4/10 grid grid-cols-5 grid-rows-2 mr-3">
        <div className="col-span-5 flex justify-between mb-2">
          {/* Lost Zone */}
          <div className="h-full w-1/8 border-3 border-purple-900 rounded-md flex justify-center">
            {board.lost.length > 0 && (<div onClick={() => setModal((prev) => ({ ...prev, lost: true }))} className="h-full w-9/10">
              <Discard array={board.lost} />
            </div>)}
            {openModal.lost &&
              (<Modal array={board.lost} from="lost" closeModal={() => setModal((prev) => ({ ...prev, lost: false }))} label={"Viewing Lost Zone"} />)
            }
          </div>
          {/* Stadium */}
          <div className="h-full w-1/8 border-3 border-blue-900 rounded-md -mt-20 flex justify-center">
            {board.stadium.length > 0 && (() => {
              const card = board.stadium.at(-1);
              return (
                <div className="h-full w-9/10 flex items-center" onClick={() => moveCard(card.id, "stadium", "discard")}>
                  <PlayCard card={card} from="stadium" />
                </div>
              )
            })()}
          </div>
          {/* Active */}
          <div className="h-full w-1/8 border-3 border-green-900 rounded-md -mt-15 flex justify-center items-center">
            {(() => {
              const card = board.active[0]?.pokemon?.at(-1);
              if (!card) return null;

              return (
                <div
                  key={card.id}
                  className="h-full w-9/10 flex items-center relative"
                  onClick={() => handleEnergy(0, "active")}
                >
                  <div className="absolute z-30">
                    <PlayCard card={card} from="active" />
                    <p className="text-sm font-bold absolute -top-0 right-0">240</p>
                  </div>

                  {board.active[0].other.map((card, i) => (
                    <div
                      key={card.id}
                      className="absolute"
                      style={{
                        zIndex: 28 - i,
                        transform: `translateX(${(i + 1) * 16}px)`,
                      }}
                    >
                      <PlayCard card={card} from="active" />
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
          {/* Play Trainer */}
          <div className="h-full w-1/8 border-3 border-green-900 rounded-md -mt-15 flex justify-center">
            {board.play.length > 0 && (() => {
              const card = board.play.at(-1);
              return (
                <div className="h-full w-9/10 flex items-center " onClick={() => moveCard(card.id, "play", "discard")}>
                  <PlayCard key={card.id} card={card} from="trainer" />
                </div>
              )
            })()}
          </div>
          {/* Deck */}
          <div className="h-full w-1/8 border-3 border-green-900 rounded-md ">
            <Deck view={() => setModal((prev) => ({ ...prev, deck: true }))} />
            {openModal.deck &&
              (<Modal array={board.deck} from="deck" closeModal={() => setModal((prev) => ({ ...prev, deck: false }))} label={"Viewing Deck"} />)
            }
          </div>
        </div>
        <div className="col-span-5 flex justify-between">
          {/* Prize */}
          <div className="h-full w-1/8 border-3 border-green-900 rounded-md ">
            <Prize view={() => setModal((prev) => ({ ...prev, prize: true }))} />
            {openModal.prize &&
              (<Modal array={board.prize} from="prize" closeModal={() => setModal((prev) => ({ ...prev, prize: false }))} label={"Viewing Prize"} />)
            }
          </div>
          {/* Bench */}
          <div className="h-full w-6/8 border-3 border-green-900 rounded-md ml-1 flex justify-start">
            {board.bench.map((pokemon, index) => {
              const card = pokemon.pokemon.at(-1);

              return (
                <div key={card.id} className="relative h-full w-1/7 mx-4 flex items-center " onClick={() => handleEnergy(index, "bench")}>
                  <div className="absolute z-30">
                    <PlayCard card={card} from="bench" benchid={index} />
                  </div>
                  {pokemon.other.map((card, i) => (
                    <div key={card.id} className="absolute" style={{
                      zIndex: 28 - i,
                      transform: `translateY(${-(i + 1) * 14}px)`,
                    }} >
                      <PlayCard card={card} from="bench" />
                    </div>
                  ))}
                </div>
              )
            }
            )}
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
        {board.hand.map((card, i) => {
          // Check if hand has 10 or more cards
          const handIsLarge = board.hand.length >= 11;
          const handIsHuge = board.hand.length >= 24;

          let marginLeft = 0;
          // 1 Card
          if (i === 0) {
            marginLeft = 0;
          } else if (i >= 1 && i <= 10) {
            marginLeft = handIsHuge ? -90 : handIsLarge ? -((board.hand.length - 1) * 4) : -36;
          } else if (i >= 11 && i <= 24) {
            marginLeft = handIsHuge ? -90 : -((board.hand.length - 1) * 4);
          }
          else {
            marginLeft = -90
          }
          return (
            <div
              key={card.id}
              className="relative w-[15%] -translate-y-5 transition-transform hover:-translate-y-20 duration-200 z-50"
              style={{ marginLeft }}
            >
              <PlayCard card={card} from="hand" selectCard={setSelectedCard} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Board;
