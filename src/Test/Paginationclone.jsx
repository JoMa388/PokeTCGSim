import { useState, useRef } from "react";
import Card from "./CardClone";
import Search from "../components/Search";
const Pagination = ({ cards, onhover = () => { }, setDraggingCard }) => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 20;
  const searchRef = useRef();
  const triggerSearch = () => {
    searchRef.current?.handleSearch();
  };
  const handleDrag = (card) => {
    setDraggingCard(card);
  };
  return (
    <div className="flex flex-col justify-evenly w-1/4 bg-zinc-900 rounded-xl m-2 p-2">
      <Search ref={searchRef} cards={cards} filterSetter={setFilteredCards} setPage={setCurrentPage} />
      <div className="flex justify-center">
        {/* Prev Button */}
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0} className="btn px-4 mx-2">
          Prev
        </button>
        <div className="flex flex-col items-center h-1/3">
          <button onClick={triggerSearch} className="btn mx-2">
            Search
          </button>
          {filteredCards.length > 0 ?
            <p>
              {currentPage + 1}/{Math.ceil((filteredCards.length + 1) / cardsPerPage)}
            </p>
            : <p>0/0</p>}
        </div>
        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((prev) => ((prev + 1) * cardsPerPage < cards.length ? prev + 1 : prev))}
          disabled={(currentPage + 1) * cardsPerPage >= cards.length || filteredCards.length == 0}
          className=" btn mx-2"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-4 grid-rows-5 rounded-xl w-full h-2/3 bg-green-900">
        {filteredCards.length > 0
          ? filteredCards.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage).map((card) => (
            <div key={card.id} draggable onDragStart={() => handleDrag(card)} className="w-full h-full bg-green-900">
              <Card card={card} onHover={() => onhover(card)} />
            </div>
          ))
          : // Show placeholders filling all slots so container has visible size
          Array(cardsPerPage)
            .fill(null)
            .map((_, index) => <div key={index} className="w-full h-full bg-green-900 border border-black rounded " />)}
      </div>
    </div>
  );
};
export default Pagination;
