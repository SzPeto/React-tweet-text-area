import React from 'react'
import { List, useTable, DateField, TextField, ShowButton, EditButton, DeleteButton } from '@refinedev/antd'
import { Space, Table } from 'antd'
import { TweetType } from './tweet.type'

export const TweetsList: React.FC = () => {
  const { tableProps, tableQuery } = useTable<TweetType>({ resource: 'tweets', pagination: { mode: 'off' } })

  if (tableQuery.isLoading) {
    return <p>Loading...</p>
  }

  return (
    <List title='Tweets'>
      <Table { ...tableProps } rowKey='_id'>
        <Table.Column<TweetType> 
          title='Content' 
          dataIndex='content' 
          render={ (v) => <TextField value={ v } /> } 
        />

        <Table.Column<TweetType> 
          title='Author' 
          render={ (_, r) => r.user?.userName ?? '—' } 
        />

        <Table.Column<TweetType> 
          title='Created' 
          dataIndex='createdAt' 
          render={ (v) => <DateField value={ v } /> } 
        />

        <Table.Column<TweetType>
          title='Actions'
          render={ (_, record) => (
            <Space>
              <ShowButton hideText size='small' recordItemId={ record._id } />
              <EditButton hideText size='small' recordItemId={ record._id } />
              <DeleteButton hideText size='small' recordItemId={ record._id } />
            </Space>
          ) }
        />
      </Table>
    </List>
  )
}