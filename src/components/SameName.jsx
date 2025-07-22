import axios from "axios";
import { supabase } from "../supabase-client";
import { useState, useEffect } from "react";
import { regulationG } from "../constants/QueryStrings";
import Card from "./Card";
import HoverCard from "./HoverCard";
const apiKEY = import.meta.env.VITE_POKEMON_API_KEY;
const SameName = () => {
  const [cards, setCards] = useState([]);
  const [nameCards, setNameCards] = useState([]);
  const [hoveredCard, setHoverCard] = useState(null);
  const fetchCards = async () => {
    const { error, data } = await supabase.from("Cards").select("*").eq(`"regulation", ${regulationG}`);
    if (error) {
      console.error("Error Reading", error.message);
      return;
    }
    const parsed = JSON.parse(data[0].data);
    setCards(parsed);
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
  };
  useEffect(() => {
    fetchCards();
    const cached = localStorage.getItem("cards");
    if (cached) {
      const parsed = JSON.parse(cached);
      setNameCards(parsed);
      return;
    }
  }, []);
  useEffect(() => {
    if (cards.length === 0 || nameCards.length === 0) return;

    const cardIds = new Set(cards.map((card) => card.id));
    const filtered = nameCards.filter((card) => !cardIds.has(card.id));
    setNameCards(filtered);
  }, [cards]);

  console.log(cards);
  console.log(nameCards);
  return (
    <>
      <HoverCard hoveredCard={hoveredCard} />
      <div className="grid grid-cols-20">
        {nameCards.map((card) => (
          <Card card={card} onHover={() => setHoverCard(card)}></Card>
        ))}
      </div>
    </>
  );
};
export default SameName;
