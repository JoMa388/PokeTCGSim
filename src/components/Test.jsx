import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
const Test = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hoveredCard, setHoverCard] = useState(null);
  const [searchName, setSearchName] = useState("");
  const [selectType, setSelectType] = useState("");
  const fetchCards = async (pageNumber) => {
    try {
      const { data } = await axios.get("https://api.pokemontcg.io/v2/cards", {
        params: {
          q: "(regulationMark:G OR regulationMark:H OR regulationMark:I OR regulationMark:J)",
          orderBy: "name",
          pageSize: 25,
          page: pageNumber,
        },
        headers: {
          "X-Api-Key": "c26040e7-239f-4ed5-9dad-af194d301eef",
        },
      });
      const filtered = data.data.filter((card) => card.supertype !== "Energy");
      setCards(filtered);
      setHasMore(pageNumber * 25 < data.totalCount);
    } catch (error) {
      console.error("Error fetching Pokémon set:", error);
    }
  };

  useEffect(() => {
    fetchCards(page);
  }, [page]);
  const filterSearch = cards.filter((card) => {
    const searchCard = card.name.toLowerCase().includes(searchName.toLowerCase());
    const typeCard = selectType === "" || card.supertype?.toLowerCase() === selectType.toLowerCase();
    return searchCard && typeCard;
  });
  return (
    <div className="flex justify-between p-4 gap-8">
      <div className="w-100 mt-70">{hoveredCard && <img src={hoveredCard.images.large} alt={hoveredCard.name} className="w-full h-auto" />}</div>

      <section className="flex flex-col ">
        <div className="flex items-center">
          {/* Name Input */}
          <Input value={searchName} setter={setSearchName} label={"Name :"} />
        </div>
        <div className="flex items-center">
          {" "}
          {/* Text Input */}
          <label htmlFor="searhText" className="font-bold text-xl w-24">
            Text :
          </label>
          <input type="text" id="searchText" className="bg-white my-2 p-1 text-black w-80" />
        </div>
        <div className="flex items-center my-2">
          <Dropdown value={selectType} setter={setSelectType}></Dropdown>
        </div>
        {/* Next & Prev Page Buttons */}
        <div className="flex justify-between m-4">
          <button disabled={page === 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))} className="px-4 py-2 ">
            Prev
          </button>
          <button disabled={!hasMore} onClick={() => setPage((prev) => prev + 1)} className="px-4 py-2">
            Next
          </button>
        </div>
        <div className="grid grid-cols-4 grid-rows-5 gap-1 bg-green-600 rounded">
          {filterSearch.slice(0, 20).map((card) => (
            <div key={card.id} className="border-3 border-black rounded">
              <Card card={card} onHover={() => setHoverCard(card)} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Test;
