type UserType = {
  _id: string,
  userName: string,
  email: string,
  picturePath: string
}

export type TweetType = {
  _id: string
  content: string
  createdAt: string
  user: UserType
}