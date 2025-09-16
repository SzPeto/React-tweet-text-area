import { Refine } from '@refinedev/core'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router'
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router'
import { useNotificationProvider, RefineThemes, ThemedLayout, ThemedTitle } from '@refinedev/antd'
import { App as AntdApp, ConfigProvider } from 'antd'
import { dataProvider } from './providers/dataProvider'
import { TweetsList } from './pages/tweets/list'
import { TweetCreate } from './pages/tweets/create'
import { TweetShow } from './pages/tweets/show'
import { TweetEdit } from './pages/tweets/edit'
import { UsersList } from './pages/users/list'
import { UserCreate } from './pages/users/create'
import { UserShow } from './pages/users/show'
import { UserEdit } from './pages/users/edit'
import '@refinedev/antd/dist/reset.css'

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={ RefineThemes.Blue }>
        <AntdApp>
          <Refine
            dataProvider={ dataProvider }
            notificationProvider={ useNotificationProvider }
            routerProvider={ routerProvider }
            options={{ syncWithLocation: true }}
            resources={[
              { 
                name: 'tweets', 
                list: '/tweets',
                create: '/tweets/create',
                show: '/tweets/:id',
                edit: '/tweets/:id/edit',
                meta: { label: 'Tweets' }
              },
              { 
                name: 'users', 
                list: '/users',
                create: '/users/create',
                show: '/users/:id',
                edit: '/users/:id/edit',
                meta: { label: 'Users' }
              },
            ]}
          >
            <Routes>
              <Route 
                element={
                  <ThemedLayout
                    Title={ (props) => (<ThemedTitle {...props} text='Tweets admin dashboard' />) }
                  >
                    <Outlet />
                  </ThemedLayout>
                }
              >
                <Route path='/tweets' element={<TweetsList />} />
                <Route path='/tweets/create' element={<TweetCreate />} />
                <Route path='/tweets/:id' element={<TweetShow />} />
                <Route path='/tweets/:id/edit' element={<TweetEdit />} />
                <Route path='/users' element={<UsersList />} />
                <Route path='/users/create' element={<UserCreate />} />
                <Route path='/users/:id' element={<UserShow />} />
                <Route path='/users/:id/edit' element={<UserEdit />} />
                <Route index element={<TweetsList />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App