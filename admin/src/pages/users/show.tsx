import { useShow } from '@refinedev/core'
import { Show, TextField } from '@refinedev/antd'
import { Typography } from 'antd'

export const UserShow: React.FC = () => {
  const { result: user, query: { isLoading } } = useShow()

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <Show isLoading={ isLoading }>
      <Typography.Title level={ 5 }>Username</Typography.Title>
      <TextField value={ user!.userName } />

      <Typography.Title level={ 5 }>Email</Typography.Title>
      <TextField value={ user!.email } />
    </Show>
  )
}