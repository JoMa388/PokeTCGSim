import { useState, useRef } from "react";
import Card from "./Card";
import Search from "./Search";
const Pagination = ({ cards, onhover = () => { }, setDraggingCard }) => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 24;
  const searchRef = useRef();
  const triggeSearch = () => {
    searchRef.current?.handleSearch();
  };
  return (
    <div className="flex flex-col justify-between w-85 h-full bg-zinc-900 p-1 rounded-xl mt-1">
      <Search ref={searchRef} cards={cards} filterSetter={setFilteredCards} setPage={setCurrentPage} />
      <div className="flex justify-center h-3">
        {/* Prev Button */}
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0} className="btn px-4 py-2 mx-2">
          Prev
        </button>
        <div className="flex flex-col items-center">
          <button onClick={triggeSearch} className="btn mx-2">
            Search
          </button>
          {filteredCards.length > 0 && (
            <p>
              {currentPage + 1}/{Math.ceil((filteredCards.length + 1) / cardsPerPage)}
            </p>
          )}
        </div>
        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((prev) => ((prev + 1) * cardsPerPage < cards.length ? prev + 1 : prev))}
          disabled={(currentPage + 1) * cardsPerPage >= cards.length}
          className=" btn px-4 py-2 mx-2"
        >
          Next
        </button>
      </div>
      <div className="grid grid-cols-4 grid-rows-5 rounded-xl w-full h-7/10 mb-4">
        {filteredCards.length > 0
          ? filteredCards.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage).map((card) => (
            <div draggable onDragStart={() => setDraggingCard(card)} onDragEnd={() => setDraggingCard(null)}>
              <Card key={card.id} card={card} onHover={() => onhover(card)} />
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
