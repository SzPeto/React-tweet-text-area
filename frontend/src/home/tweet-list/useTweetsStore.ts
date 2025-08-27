import { create } from 'zustand'
import type { TweetType } from '@/home/tweet-list/tweetType'

type TweetsStore = {
  tweets: TweetType[],
  addTweet: (tweet: TweetType) => void
  setTweets: (tweets: TweetType[]) => void
}

export const useTweetsStore = create<TweetsStore>((set) => ({
  tweets: [],
  addTweet: (tweet) => set((state) => ({ tweets: [...state.tweets, tweet] })),
  setTweets: (tweets) => set({ tweets: tweets })
}))