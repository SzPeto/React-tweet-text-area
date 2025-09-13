import { Refine } from '@refinedev/core'
import { useNotificationProvider, RefineThemes, ThemedLayout } from '@refinedev/antd'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router'
import { App as AntdApp, ConfigProvider } from 'antd'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { TweetsList } from './pages/tweets/list'
import { UsersList } from './pages/users/list'
import { dataProvider } from './providers/dataProvider'
import '@refinedev/antd/dist/reset.css'

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider theme={ RefineThemes.Blue }>
        <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={ dataProvider }
                notificationProvider={ useNotificationProvider }
                routerProvider={ routerProvider }
                options={{ syncWithLocation: true }}
                resources={[
                  { name: 'tweets', list: '/tweets' },
                  { name: 'users', list: '/users' },
                ]}
              >
                <Routes>
                  <Route element={<ThemedLayout><Outlet /></ThemedLayout>}>
                    <Route path='/tweets' element={<TweetsList />} />
                    <Route path='/users' element={<UsersList />} />
                    <Route index element={<TweetsList />} />
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </RefineKbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App