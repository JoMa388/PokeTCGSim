import { create } from "zustand";

const useBoard = create((set, get) => ({
  board: {
    deck: [],
    discard: [],
    lost: [],
    prize: [],
    active: [
      {
        pokemon: [],
        other: [],
      },
    ],
    bench: [],
    hand: [],
    stadium: [],
    play: [],
    // modal: { deck: false, discard: false, lost: false, prize: false },
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
  moveCard: (cardID, from, to, index) => {
    set((state) => {
      let updatedBoard = { ...state.board };
      // Move Active Pokemon and attached cards to bench
      if (from == "active" && to == "bench") {
        const objectToMove = state.board.active[0];
        console.log(objectToMove);
        updatedBoard = {
          ...state.board,
          active: [
            {
              pokemon: [],
              other: [],
            },
          ],
          bench: [...state.board.bench, objectToMove],
        };
        return { board: updatedBoard };
      }
      // Moving Active Pokemon
      if (from == "active") {
        const pokemonArray = state.board.active[0].pokemon;
        const energyArray = state.board.active[0].other;
        if (to == "hand") {
          updatedBoard[to] = [...state.board[to], pokemonArray.at(-1)];
          updatedBoard.discard = [
            ...pokemonArray.slice(0, -1),
            ...energyArray,
            ...state.board.discard,
          ];
        } else {
          updatedBoard[to] = [
            ...pokemonArray,
            ...energyArray,
            ...state.board[to],
          ];
        }
        updatedBoard.active = [{ pokemon: [], other: [] }];
        return { board: updatedBoard };
      }
      // Move Bench Pokemon Object to Active
      if (from == "bench" && to == "active") {
        const objectToMove = state.board.bench[index];
        const newBench = updatedBoard.bench.filter((_, i) => i !== index);
        updatedBoard.active = [objectToMove];
        updatedBoard.bench = newBench;
        return { board: updatedBoard };
      }
      let cardToMove = state.board[from].find((card) => card.id === cardID);
      updatedBoard[from] = state.board[from].filter(
        (card) => card.id !== cardID,
      );
      // Add Pokemon to Active
      if (to == "active") {
        updatedBoard.active = [
          {
            pokemon: [cardToMove],
            other: [],
          },
        ];
        console.log(get().board.prize.at(-1).id);
        return { board: updatedBoard };
      }
      // Moving Bench Pokemon
      if (from == "bench") {
        const pokemonArray = state.board.bench[index].pokemon;
        const energyArray = state.board.bench[index].other;
        if (to == "hand") {
          updatedBoard[to] = [...state.board[to], pokemonArray.at(-1)];
          updatedBoard.discard = [
            ...pokemonArray.slice(0, -1),
            ...energyArray,
            ...state.board.discard,
          ];
        } else {
          updatedBoard[to] = [
            ...pokemonArray,
            ...energyArray,
            ...state.board[to],
          ];
        }
        updatedBoard.bench = state.board.bench.filter((_, i) => i !== index);
        return { board: updatedBoard };
      }
      // Add Pokemon to Bench
      if (to == "bench") {
        updatedBoard.bench = [
          ...state.board.bench,
          {
            pokemon: [cardToMove],
            other: [],
          },
        ];
        return { board: updatedBoard };
      }
      if (to == "hand") {
        updatedBoard[to] = [...state.board[to], cardToMove];
      } else {
        updatedBoard[to] = [cardToMove, ...state.board[to]];
      }
      return { board: updatedBoard };
    });
  },
  evolvePokemon: (cardID, from, to, index) => {
    set((state) => {
      let updatedBoard = { ...state.board };
      if (to == "active") {
        let cardToMove = state.board[from].find((card) => card.id === cardID);
        updatedBoard[from] = state.board[from].filter(
          (card) => card.id !== cardID,
        );
        updatedBoard.active[0] = {
          ...updatedBoard.active[0],
          pokemon: [...updatedBoard.active[0].pokemon, cardToMove],
        };
      }
      return { board: updatedBoard };
    });
  },
  moveEnergy: (cardID, from, to, index) => {
    set((state) => {
      const updatedBoard = { ...state.board };
      const cardToMove = updatedBoard[from].find((card) => card.id === cardID);
      updatedBoard[from] = state.board[from].filter(
        (card) => card.id !== cardID,
      );
      updatedBoard[to] = [
        ...updatedBoard[to].slice(0, index),
        {
          ...state.board[to][index],
          other: [...state.board[to][index].other, cardToMove],
        },
        ...updatedBoard[to].slice(index + 1),
      ];
      return { board: updatedBoard };
    });
  },
  mulligan: () => {
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
