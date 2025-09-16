import { BaseKey } from "@refinedev/core";
import { api } from "../../_api/swagger-api/swaggerApi";

export const getOneHelper = async (id: BaseKey, resource: string) => {
  let res: any
  let data
  
  if (resource === 'tweets') {
    res = await api.tweets.tweetsControllerGetTweetById(id as any)
    data = res.data
  } else if (resource === 'users') {
    res = await api.users.usersControllerGetUserById(id as any)
    data = res.data
  }

  if (res.status < 200 || res.status > 299) throw res
  return data
}