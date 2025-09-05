import type { User } from "@/account/login-page/user.type"

export type TweetType = {
  _id: string
  content: string
  createdAt: string
  user: User
}