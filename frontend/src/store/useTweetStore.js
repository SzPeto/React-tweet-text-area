import { create } from "zustand";

/*
    • create is a function provided by Zustand, it creates a custom hook
    • Pass the function set(also provided by Zustand) into argument of create, it works similarly as useState set function
    • The arrow function in create argument return an object, which contains the store state and actions
    • The returned object is the actual store
*/

const useTweetStore = create((set) => ({
    tweets: [], // The current state
    /* Function to update state, arrow function which calls the callback set, state is a JS object, state.tweets are the tweets
       before update */
    addTweet: (tweet) => set((state) => ({ tweets: [...state.tweets, tweet] })),
    clearTweets: () => set({ tweets: [] }) // Function to reset state, here the arrow function calls the callback function set
}));

export default useTweetStore;