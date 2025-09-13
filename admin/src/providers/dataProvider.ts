import type { DataProvider } from '@refinedev/core'
import { getListHelper } from './utils/getListHelper'

const API_URL = 'http://localhost:3000/api'

export const dataProvider: DataProvider = {
  getOne: () => {
    throw new Error('Not implemented')
  },
  update: () => {
    throw new Error('Not implemented')
  },
  getList: async ({ resource }) => {
    const data = await getListHelper(resource)
    return { data: data, total: data.length }
  },
  create: () => {
    throw new Error('Not implemented')
  },
  deleteOne: () => {
    throw new Error('Not implemented')
  },
  getApiUrl: () => API_URL,
}