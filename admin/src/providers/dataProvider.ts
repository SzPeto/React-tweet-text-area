import type { DataProvider } from '@refinedev/core'
import { api } from '../_api/swagger-api/swaggerApi'

const API_URL = 'https://api.fake-rest.refine.dev'

export const dataProvider: DataProvider = {
  getOne: () => {
    throw new Error('Not implemented')
  },
  update: () => {
    throw new Error('Not implemented')
  },
  getList: async ({ resource }) => {
    let data: any[] = []
    if (resource === 'tweets') {
      const res = await api.tweets.tweetsControllerGetAllTweets()
      data = res.data
    } else if (resource === 'users') {
      /* const res = await usersControllerGetAllUsers()
      data = res.data */
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