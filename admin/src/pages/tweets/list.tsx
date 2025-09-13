import React from 'react'
import type { BaseRecord } from '@refinedev/core'
import { List, useTable, DateField, TextField } from '@refinedev/antd'
import { Table } from 'antd'

type User = { 
  _id: string,
  userName: string,
  email: string 
}
type Tweet = BaseRecord & {
  _id: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  user: User
}

export const TweetsList: React.FC = () => {
  const { tableProps } = useTable<Tweet>({ resource: 'tweets', pagination: { mode: 'off' } })

  return (
    <List title='Tweets'>
      <Table { ...tableProps } rowKey='_id'>
        <Table.Column<Tweet> title='Content' dataIndex='content' render={(v) => <TextField value={v} />} />
        <Table.Column<Tweet> title='Author' render={(_, r) => r.user?.userName ?? '—'} />
        <Table.Column<Tweet> title='Created' dataIndex='createdAt' render={(v) => <DateField value={v} />} />
      </Table>
    </List>
  )
}