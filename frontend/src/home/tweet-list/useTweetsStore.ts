import { create } from 'zustand'
import type { TweetType } from '@/home/tweet-list/tweet.type'

type TweetsStore = {
  tweets: TweetType[],
  addTweet: (tweet: TweetType) => void,
  setTweets: (tweets: TweetType[]) => void
}

export const useTweetsStore = create<TweetsStore>((set) => ({
  tweets: [],
  addTweet: (tweet) => set((s) => ({ tweets: [...s.tweets, tweet] })),
  setTweets: (tweets) => set({ tweets: tweets })
}))