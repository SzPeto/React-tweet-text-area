import { create } from 'zustand'
import type { Tweet } from '@/tweets/tweet/types/tweet'

type TweetsStore = {
  tweets: Tweet[],
  addTweet: (tweet: Tweet) => void
  setTweets: (tweets: Tweet[]) => void
}

export const useTweetsStore = create<TweetsStore>((set) => ({
  tweets: [],
  addTweet: (tweet) => set((state) => ({ tweets: [...state.tweets, tweet] })),
  setTweets: (tweets) => set({ tweets: tweets })
}))