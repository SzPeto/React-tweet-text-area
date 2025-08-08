import { create } from "zustand";

const useCounterStore = create((set) => ({
    count: 1,
    setCount: (value) => set({ count: value })
}));

export default useCounterStore;