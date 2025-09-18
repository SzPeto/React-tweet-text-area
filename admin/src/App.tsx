import { Authenticated, Refine } from '@refinedev/core'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import routerProvider, { DocumentTitleHandler, UnsavedChangesNotifier } from '@refinedev/react-router'
import { useNotificationProvider, RefineThemes, ThemedLayout, ThemedTitle } from '@refinedev/antd'
import { App as AntdApp, ConfigProvider } from 'antd'
import { LoginPage } from './pages/login/Login'
import { rootRoutes } from './routes/rootRoutes'
import { dataProvider } from './providers/dataProvider'
import { authProvider } from './providers/authProvider'
import { resourcesCustom } from './providers/resourcesCustom'
import '@refinedev/antd/dist/reset.css'

function App() {

  return (
    <BrowserRouter>
      <ConfigProvider theme={ RefineThemes.Blue }>
        <AntdApp>
          <Refine
            dataProvider={ dataProvider }
            authProvider={ authProvider }
            notificationProvider={ useNotificationProvider }
            routerProvider={ routerProvider }
            options={{ syncWithLocation: true }}
            resources={ resourcesCustom }
          >
            <Authenticated key='protected' fallback={ 
              <LoginPage registerLink={ false } forgotPasswordLink={ false } /> 
            }>
              <Routes>
                <Route 
                  element={
                    <ThemedLayout Title={ (props) => (<ThemedTitle { ...props } text='Tweets admin' />) }>
                      <Outlet />
                    </ThemedLayout>
                  }
                >
                  { rootRoutes }
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Authenticated>
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App