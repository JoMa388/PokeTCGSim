import { create } from "zustand";

const useBoard = create((set, get) => ({
  board: {
    deck: [],
    discard: [],
    lost: [],
    prize: [],
    active: [],
    bench: [],
    hand: [],
    stadium: [],
    play: [],
    modal: { deck: false, discard: false, lost: false, prize: false },
  },
  setArray: (arrayName, array) => {
    set((state) => ({
      board: {
        ...state.board,
        [arrayName]: array,
      },
    }));
  },
  shuffleArray: (arrayName) => {
    let result = [];
    set((state) => {
      const array = state.board[arrayName];
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      result = shuffled;
      return {
        board: {
          ...state.board,
          [arrayName]: shuffled,
        },
      };
    });
    return result;
  },
  drawCards: (num) => {
    set((state) => {
      const drawn = state.board.deck.slice(0, num);
      const remaining = state.board.deck.slice(num);
      const hand = [...state.board.hand, ...drawn];
      return {
        board: {
          ...state.board,
          hand: hand,
          deck: remaining,
        },
      };
    });
  },
  moveCard: (cardID, from, to) => {
    set((state) => {
      const cardToMove = state.board[from].find((card) => card.id === cardID);
      if (!cardToMove) return state;

      return {
        board: {
          ...state.board,
          [from]: state.board[from].filter((card) => card.id !== cardID),
          [to]: [...state.board[to], cardToMove],
        },
      };
    });
  },
  mulligan: () => {
    console.log(get().board);
    let shuffledDeck = get().board.deck;
    let hasBasic = false;
    let drawn = [];

    do {
      get().shuffleArray("deck");
      shuffledDeck = get().board.deck;

      drawn = shuffledDeck.slice(0, 7);
      hasBasic = drawn.some(
        (card) =>
          card.supertype === "Pokémon" && card.subtypes?.[0] === "Basic",
      );
    } while (!hasBasic);
    const prizeCards = shuffledDeck.slice(7, 13);
    const remaining = shuffledDeck.slice(13);

    set((state) => ({
      board: {
        ...state.board,
        hand: drawn,
        deck: remaining,
        prize: prizeCards,
      },
    }));
    console.log(get().board);
  },
}));

export default useBoard;
