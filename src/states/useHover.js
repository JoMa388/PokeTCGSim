import { create } from "zustand";
const useHover = create((set) => ({
  card: null,
  setHover: (card) => set({ card }),
}));
export default useHover;
