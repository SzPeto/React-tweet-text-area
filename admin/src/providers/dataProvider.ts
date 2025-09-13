import type { DataProvider } from '@refinedev/core'
import { api } from '../_api/swagger-api/swaggerApi'

const API_URL = 'http://localhost:3000/api'

export const dataProvider: DataProvider = {
  getOne: () => {
    throw new Error('Not implemented')
  },
  update: () => {
    throw new Error('Not implemented')
  },
  getList: async ({ resource }) => {
    let res: any
    let data: any[] = []
    if (resource === 'tweets') {
      res = await api.tweets.tweetsControllerGetAllTweets()
      data = res.data
    } else if (resource === 'users') {
      res = await api.users.usersControllerGetAllUsers()
      data = res.data
    }
    if (res.status < 200 || res.status > 299) {
      throw res
    }
    return { data, total: data.length }
  },
  create: () => {
    throw new Error('Not implemented')
  },
  deleteOne: () => {
    throw new Error('Not implemented')
  },
  getApiUrl: () => API_URL,
}

  // Optional methods:
  // getMany: () => { /* ... */ },
  // createMany: () => { /* ... */ },
  // deleteMany: () => { /* ... */ },
  // updateMany: () => { /* ... */ },
  // custom: () => { /* ... */ },