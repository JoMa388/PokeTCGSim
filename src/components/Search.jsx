import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Type, TrainerSubType, EnergySubType, PokémonsubType } from "../constants/Dropdownvalues";
import Input from "./Input";
import Dropdown from "./Dropdown";
const Search = forwardRef(({ cards, filterSetter, setPage }, ref) => {
  const [filter, setFilter] = useState({
    searchName: "",
    searchText: "",
    selectType: "",
    selectSubType: "",
  });
  const handleSearch = () => {
    const filterSearch = cards.filter((card) => {
      const searchCard = card.name.toLowerCase().includes(filter.searchName.toLowerCase());
      const searchText = (card.rules?.[0] || "").toLowerCase().includes(filter.searchText.toLowerCase());
      const typeCard = filter.selectType === "" || card.supertype?.toLowerCase() === filter.selectType.toLowerCase();
      const subtype = filter.selectSubType === "" || card.subtypes?.[0]?.toLowerCase() === filter.selectSubType.toLowerCase();
      return searchCard && searchText && typeCard && subtype;
    });
    filterSetter(filterSearch);
    setPage(0);
  };
  useImperativeHandle(ref, () => ({
    handleSearch,
  }));
  useEffect(() => {
    handleSearch();
  }, [filter]);
  useState(() => { });
  return (
    <div>
      <Input value={filter.searchName} setter={(val) => setFilter((prev) => ({ ...prev, searchName: val }))} label={"Name:"} />
      <Input value={filter.searchText} setter={(val) => setFilter((prev) => ({ ...prev, searchText: val }))} label={"Text:"} />
      <Dropdown value={filter.selectType} setter={setFilter} optValues={Type} filterTarget={"selectType"} label={"Card:"} />
      {filter.selectType === "" && (
        <div className="flex justify-start items-center mt-2 ">
          <label htmlFor="cardType" className="font-bold text-md mx-4">
            Type:
          </label>
          <select id="cardType" className="bg-red-900 w-1/4 items-center text-sm rounded p-1" disabled={true}></select>{" "}
        </div>
      )}
      {filter.selectType === "Pokémon" && (
        <Dropdown value={filter.selectSubType} setter={setFilter} optValues={PokémonsubType} filterTarget={"selectSubType"} label={"Type:"} />
      )}
      {filter.selectType === "Trainer" && (
        <Dropdown value={filter.selectSubType} setter={setFilter} optValues={TrainerSubType} filterTarget={"selectSubType"} label={"Type:"} />
      )}
      {filter.selectType === "Energy" && (
        <Dropdown value={filter.selectSubType} setter={setFilter} optValues={EnergySubType} filterTarget={"selectSubType"} label={"Type:"} />
      )}
    </div>
  );
});
export default Search;
