import { BaseRecord } from '@refinedev/core'

export type UserType = BaseRecord & { 
  _id: string,
  userName: string,
  email: string
}