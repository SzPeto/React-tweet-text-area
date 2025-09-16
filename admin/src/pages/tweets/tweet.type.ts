import { BaseRecord } from '@refinedev/core'

type User = { 
  _id: string,
  userName: string,
  email: string 
}
export type TweetType = BaseRecord & {
  _id: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  user: User
}