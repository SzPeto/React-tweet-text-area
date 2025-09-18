import type { DataProvider } from '@refinedev/core'
import { getListHelper } from './data-utils/getListHelper'
import { getOneHelper } from './data-utils/getOneHelper'
import { updateHelper } from './data-utils/updateHelper'
import { deleteOneHelper } from './data-utils/deleteOneHelper'
import { createHelper } from './data-utils/createHelper'

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
  getApiUrl: () => API_URL
}