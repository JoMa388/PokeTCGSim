import axios from "axios";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import { APIKEY } from "../../apikey/apikey";
import { Type } from "../constants/Dropdownvalues";
import { subType } from "../constants/Dropdownvalues";
const DeckBuilder = () => {
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [deckCards, setDeckCards] = useState(Array(60).fill(null));
  const [hoveredCard, setHoverCard] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [dragData, setDragData] = useState({ source: null, card: null });

  const [filter, setFilter] = useState({
    searchName: "",
    searchText: "",
    selectType: "",
    selectSubType: "",
  });
  const cardsPerPage = 20;

  useEffect(() => {
    const cached = localStorage.getItem("allCards");
    if (cached) {
      const parsed = JSON.parse(cached);
      setAllCards(parsed);
      return;
    }
    fetchCards();
  }, []);

  const handleSearch = () => {
    const filterSearch = allCards.filter((card) => {
      const searchCard = card.name.toLowerCase().includes(filter.searchName.toLowerCase());
      const searchText = (card.rules?.[0] || "").toLowerCase().includes(filter.searchText.toLowerCase());
      const typeCard = filter.selectType === "" || card.supertype?.toLowerCase() === filter.selectType.toLowerCase();
      const subtype = filter.selectSubType === "" || card.subtypes?.[0]?.toLowerCase() === filter.selectSubType.toLowerCase();
      return searchCard && searchText && typeCard && subtype;
    });
    setFilteredCards(filterSearch);
    setCurrentPage(0);
  };

  const fetchCards = async () => {
    let fetchedCards = [];
    let hasMore = true;
    let page = 1;
    try {
      while (hasMore) {
        const { data } = await axios.get("https://api.pokemontcg.io/v2/cards", {
          params: {
            q: "(regulationMark:G OR regulationMark:H OR regulationMark:I OR regulationMark:J)",
            orderBy: "name",
            pageSize: 250,
            page,
          },
          headers: {
            "X-Api-Key": { APIKEY },
          },
        });
        console.log(data.data);
        fetchedCards = [...fetchedCards, ...data.data];
        hasMore = page * 250 < data.totalCount;
        page++;
      }
    } catch (error) {
      console.error("Error fetching Pokémon set:", error);
    }

    const uniqueCards = Array.from(new Map(fetchedCards.map((card) => [card.id, card])).values());
    setAllCards(uniqueCards);
    const trimmed = uniqueCards.map(({ hp, id, images, name, regulationMark, supertype, subtypes, set, rules }) => ({
      hp,
      id,
      images,
      name,
      regulationMark,
      supertype,
      subtypes,
      set,
      rules,
    }));
    localStorage.setItem("allCards", JSON.stringify(trimmed));
  };
  const addCardToDeck = (card) => {
    setDeckCards((prev) => {
      const next = [...prev];
      const index = next.findIndex((slot) => slot === null);
      if (index !== -1) {
        next[index] = card;
      }
      return next;
    });
  };
  const removeCardFromDeck = (index) => {
    setDeckCards((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  };
  useEffect(() => {
    handleSearch();
  }, [filter]);
  return (
    <>
      <section className="flex justify-between p-4 gap-8">
        <div className="w-90 h-121 mt-70 border border-black border-3 rounded-xl bg-zinc-900">
          {hoveredCard && <img src={hoveredCard.images.large} alt={hoveredCard.name} className="w-full h-auto " />}
        </div>
        <div className="grid grid-cols-10 grid-rows-6 w-[1000px] h-[850px] mt-70  border border-black border-3 rounded-lg">
          {deckCards.map((card, idx) => (
            <div
              key={idx}
              onContextMenu={(e) => {
                e.preventDefault();
                removeCardFromDeck(idx);
              }}
              draggable={!!card}
              onDragStart={() => {
                if (card) setDragData({ source: "deck", card, index: idx });
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                setDeckCards((prev) => {
                  const updated = [...prev];

                  if (dragData.source === "list") {
                    // Fill the target slot
                    if (!updated[idx]) updated[idx] = dragData.card;
                  } else if (dragData.source === "deck") {
                    // Swap cards in deck
                    const temp = updated[idx];
                    updated[idx] = dragData.card;
                    updated[dragData.index] = temp;
                  }

                  return updated;
                });
                setDragData({ source: null, card: null });
              }}
              className="w-full h-full border border-black rounded bg-green-800 flex items-center justify-center"
            >
              {card ? <img src={card.images.small} alt={card.name} className="" /> : <span className="text-white text-xs"></span>}
            </div>
          ))}
        </div>

        <section className="p-5 flex flex-col bg-zinc-800 border border-black border-3 rounded-lg">
          <Input value={filter.searchName} setter={(val) => setFilter((prev) => ({ ...prev, searchName: val }))} label={"Name :"} />
          <Input
            value={filter.searchText}
            setter={(val) => setFilter((prev) => ({ ...prev, searchText: val }))}
            label={"Text :"}
            filterTarget={"searchText"}
          />
          <Dropdown value={filter.selectType} setter={setFilter} text={"Card :"} optValues={Type} filterTarget={"selectType"}></Dropdown>
          <Dropdown value={filter.selectSubType} setter={setFilter} text={"Type :"} optValues={subType} filterTarget={"selectSubType"}></Dropdown>
          <div className="flex justify-between m-4">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0} className="px-4 py-2">
              Prev
            </button>
            <button onClick={handleSearch}>Search</button>
            <button
              onClick={() => setCurrentPage((prev) => ((prev + 1) * cardsPerPage < filteredCards.length ? prev + 1 : prev))}
              disabled={(currentPage + 1) * cardsPerPage >= filteredCards.length}
              className="px-4 py-2"
            >
              Next
            </button>
          </div>
          <div className="grid grid-cols-4 grid-rows-5 gap-1 bg-green-800 border border-black border-3 rounded-xl h-200">
            {filteredCards.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage).map((card) => (
              <div
                key={card.id}
                className="w-full h-full border bg-green-800 flex items-center justify-center border-black rounded cursor-pointer"
                onClick={() => addCardToDeck(card)}
                onDragStart={() => setDragData({ source: "list", card })}
              >
                <Card card={card} onHover={() => setHoverCard(card)} />
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
};

export default DeckBuilder;
