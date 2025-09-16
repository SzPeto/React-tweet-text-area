import type { DataProvider } from '@refinedev/core'
import { getListHelper } from './utils/getListHelper'
import { getOneHelper } from './utils/getOneHelper'

const API_URL = 'http://localhost:3000/api'

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }) => {
    const data = await getOneHelper(id, resource)
    return { data }
  },
  update: () => {
    throw new Error('Not implemented')
  },
  getList: async ({ resource }) => {
    const data = await getListHelper(resource)
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