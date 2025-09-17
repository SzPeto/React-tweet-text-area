import { useShow } from '@refinedev/core'
import { TextField, MarkdownField, Show } from '@refinedev/antd'
import { Typography } from 'antd'

export const TweetShow: React.FC = () => {
  const { result: tweet, query: { isLoading } } = useShow()

  return (
    <Show isLoading={ isLoading }>
      <Typography.Title level={ 5 }>User</Typography.Title>
      <TextField value={ tweet!.user.userName } />

      <Typography.Title level={ 5 }>Content</Typography.Title>
      <MarkdownField value={ tweet!.content } />

      <Typography.Title level={ 5 }>Created at</Typography.Title>
      <TextField value={ tweet!.createdAt } />
    </Show>
  )
}