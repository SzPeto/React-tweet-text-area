import { Refine } from '@refinedev/core'
import { useNotificationProvider } from '@refinedev/antd'
import { App as AntdApp } from "antd"
import routerProvider from '@refinedev/react-router-v6'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { dataProvider } from './providers/dataProvider'
import '@refinedev/antd/dist/reset.css'

function App() {
  return (
    <BrowserRouter>
      <AntdApp>
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
            <Route path='/tweets' element={ <div>Tweets List</div> } />
            <Route path='/users' element={ <div>Users List</div> } />
          </Routes>
        </Refine>
      </AntdApp>
    </BrowserRouter>
  )
}

export default App