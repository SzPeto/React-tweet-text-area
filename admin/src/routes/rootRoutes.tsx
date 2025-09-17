import { Route } from 'react-router'
import { TweetsList } from '../pages/tweets/TweetList'
import { TweetCreate } from '../pages/tweets/TweetCreate'
import { TweetShow } from '../pages/tweets/TweetShow'
import { TweetEdit } from '../pages/tweets/TweetEdit'
import { UsersList } from '../pages/users/UserList'
import { UserCreate } from '../pages/users/UserCreate'
import { UserShow } from '../pages/users/UserShow'
import { UserEdit } from '../pages/users/UserEdit'

export const rootRoutes = [
  <Route path='/tweets' element={<TweetsList />} />,
  <Route path='/tweets/create' element={<TweetCreate />} />,
  <Route path='/tweets/:id' element={<TweetShow />} />,
  <Route path='/tweets/:id/edit' element={<TweetEdit />} />,
  <Route path='/users' element={<UsersList />} />,
  <Route path='/users/create' element={<UserCreate />} />,
  <Route path='/users/:id' element={<UserShow />} />,
  <Route path='/users/:id/edit' element={<UserEdit />} />,
  <Route index element={<TweetsList />} />
]