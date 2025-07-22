import { create } from "zustand";
const useDeck = create((set) => ({
  deck: Array(60).fill(null),
  removeCard: (index) =>
    set((state) => {
      const deck = [...state.deck];
      deck[index] = null;
      return { deck: deck };
    }),
  addCard: (card, index) =>
    set((state) => {
      const deck = [...state.deck];
      if (index !== undefined) {
        deck[index] = card;
      } else {
        const firstEmpty = deck.findIndex((slot) => slot === null);
        if (firstEmpty !== -1) deck[firstEmpty] = card;
      }
      return { deck };
    }),
  moveCard: (fromIndex, toIndex) =>
    set((state) => {
      const deck = [...state.deck];
      const cardToMove = deck[fromIndex];
      deck[fromIndex] = deck[toIndex];
      deck[toIndex] = cardToMove;
      return { deck };
    }),
  setDeck: (newDeck) =>
    set(() => ({
      deck: [...newDeck],
    })),
}));
export default useDeck;
