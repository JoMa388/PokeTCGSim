import axios from "axios";
import { supabase } from "../supabase-client";
import { useState, useEffect } from "react";
import Input from "./Input";
import Pagination from "./Pagination";
import HoverCard from "./HoverCard";
const apiKEY = import.meta.env.VITE_POKEMON_API_KEY;
const ApiData = () => {
  const [cards, setCards] = useState([]);
  const [oldCards, setOldCards] = useState([]);
  const [hoveredCard, setHoverCard] = useState(null);
  const [queryString, setQueryString] = useState("");
  const fetchCards = async (string) => {
    let fetchedCards = [];
    let hasMore = true;
    let page = 1;
    if (queryString == "") return;
    try {
      while (hasMore) {
        const delay = (ms) => new Promise((res) => setTimeout(res, ms));
        const { data } = await axios.get("https://api.pokemontcg.io/v2/cards", {
          params: {
            q: string,
            orderBy: "name",
            pageSize: 250,
            page,
          },
          headers: {
            "X-Api-Key": apiKEY,
          },
        });
        fetchedCards = [...fetchedCards, ...data.data];
        hasMore = page * 250 < data.totalCount;
        page++;
        await delay(500);
      }
    } catch (error) {
      console.error("", error);
    }
    console.log("Before deduplication:", fetchedCards);
    const seenIds = new Set();
    const deduped = [];
    const removed = [];

    for (const card of fetchedCards) {
      if (seenIds.has(card.id)) {
        removed.push(card);
      } else {
        seenIds.add(card.id);
        deduped.push(card);
      }
    }
    console.log("After deduplication:", deduped);
    console.log("Removed duplicates:", removed);
    const trimmed = deduped.map(({ id, name, images, supertype, subtypes, rules }) => ({
      id,
      name,
      images,
      supertype,
      subtypes,
      rules,
    }));
    setCards(trimmed);
  };
  const fetchNameCards = async (name) => {
    let fetchedCards = [];
    let hasMore = true;
    let page = 1;
    try {
      while (hasMore) {
        const { data } = await axios.get("https://api.pokemontcg.io/v2/cards", {
          params: {
            q: `name:"${name}"`,
            orderBy: "name",
            pageSize: 250,
            page,
          },
          headers: {
            "X-Api-Key": apiKEY,
          },
        });
        fetchedCards = [...fetchedCards, ...data.data];
        console.log(data.data);
        hasMore = page * 250 < data.totalCount;
        page++;
      }
    } catch (error) {
      console.error("", error);
    }
    const trimmed = fetchedCards.map(({ id, name, images, supertype, subtypes, rules }) => ({
      id,
      name,
      images,
      supertype,
      subtypes,
      rules,
    }));
    return trimmed;
  };
  const fetchByName = async () => {
    const normalizeName = (name) => name.replace(/\s*\(.*?\)\s*/g, "").trim();
    const uniqueTrainerNames = new Set(cards.filter((card) => card.supertype === "Trainer").map((card) => normalizeName(card.name)));
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));
    const results = [];
    for (const name of uniqueTrainerNames) {
      const fetched = await fetchNameCards(name);
      results.push(...fetched);
      await delay(1000);
    }
    const cardIds = new Set(cards.map((card) => card.id));
    const filtered = results.filter((card) => !cardIds.has(card.id));
    const seen = new Set();
    const deduped = filtered.filter((card) => {
      if (seen.has(card.id)) return false;
      seen.add(card.id);
      return true;
    });

    setOldCards(deduped);
  };
  const addDB = async () => {
    if (!confirm("Are you sure you want to save to the database?")) return;
    const { error } = await supabase.from("Cards").insert([
      {
        regulation: queryString,
        data: cards,
      },
    ]);
    if (error) {
      console.error("Error Reading", error.message);
      return;
    }
  };
  const updateDB = async (column, data) => {
    if (!confirm("Are you sure you want to save to the database?")) return;
    const { error } = await supabase
      .from("Cards")
      .update([
        {
          duplicate_cards: oldCards,
        },
      ])
      .eq("regulation", queryString);
    if (error) {
      console.error("Error Reading", error.message);
      return;
    }
  };
  const removeCard = (id) => {
    setOldCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  useEffect(() => {
    fetchByName();
  }, [cards]);
  return (
    <>
      <div className="w-115 flex flex-col items-center">
        <Input id={"queryString"} value={queryString} setter={setQueryString} label={"Query API: "} />
        <button onClick={() => fetchCards(queryString)}>Search API</button>
        <section className="flex flex-col">
          <Pagination cards={cards} />
          <button className="flex justify-center mt-3" onClick={() => addDB()}>
            Save to Database
          </button>
        </section>
        <h1 className="text-center">Missing Old Cards</h1>
        <div className="flex ">
          <Pagination cards={oldCards} onhover={setHoverCard} Click={removeCard} />
          <HoverCard hoveredCard={hoveredCard} />
        </div>
        <button className="flex justify-center mt-3" onClick={() => updateDB()}>
          Save to Database
        </button>
      </div>
    </>
  );
};
export default ApiData;
