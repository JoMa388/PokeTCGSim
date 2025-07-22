import { useState } from "react";
import { supabase } from "../supabase-client";
import Dropdown from "../components/Dropdown";
import Pagination from "../components/Pagination";
import ApiData from "../components/ApiData";
import HoverCard from "../components/HoverCard";
import { regulationMarkList } from "../constants/Dropdownvalues";
const Admin = () => {
  const [cards, setCards] = useState([]); // Holds cards
  const [hoveredCard, setHoverCard] = useState(null);
  const [filter, setFilter] = useState({
    regulationMark: "",
  });

  const handleSearch = () => {
    const fetchCards = async () => {
      const { error, data } = await supabase.from("Cards").select("*").eq("regulation", `regulationMark:${filter.regulationMark}`);
      if (error) {
        console.error("Error Reading", error.message);
        return;
      }
      console.log(data[0].data);
      const parsed = data[0].data;
      setCards(parsed);
    };
    fetchCards();
  };
  const removeCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  return (
    <div className="flex justify-evenly">
      <ApiData />
      <div className="flex flex-col w-100">
        <Dropdown
          value={filter.regulationMark}
          setter={setFilter}
          label={"Regulation Mark :"}
          optValues={regulationMarkList}
          filterTarget={"regulationMark"}
        />
        <button onClick={handleSearch}>Search</button>
        <Pagination cards={cards} onhover={setHoverCard} Click={removeCard} />
        <HoverCard hoveredCard={hoveredCard} />
      </div>
    </div>
  );
};
export default Admin;
