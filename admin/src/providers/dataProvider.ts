import type { DataProvider } from '@refinedev/core'
import { getListHelper } from './utils/getListHelper'
import { getOneHelper } from './utils/getOneHelper'
import { updateHelper } from './utils/updateHelper'
import { deleteOneHelper } from './utils/deleteOneHelper'
import { createHelper } from './utils/createHelper'

const API_URL = 'http://localhost:3000/api'

export const dataProvider: DataProvider = {
  create: async ({ resource, variables }) => {
    const data = await createHelper(resource, variables)
    return { data }
  },
  getOne: async ({ id, resource }) => {
    const data = await getOneHelper(id, resource)
    return { data }
  },
  getList: async ({ resource }) => {
    const data = await getListHelper(resource)
    return { data, total: data.length }
  },
  update: async ({ id, resource, variables }) => {
    const data = await updateHelper(id, resource, variables)
    return { data }
  },
  deleteOne: async ({ id, resource }) => {
    const data = await deleteOneHelper(id, resource)
    return { data }
  },
  getApiUrl: () => API_URL,
}