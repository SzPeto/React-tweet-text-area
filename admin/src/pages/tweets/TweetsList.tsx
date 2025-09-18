import React from 'react'
import { List, useTable, DateField, TextField, ShowButton, EditButton, DeleteButton } from '@refinedev/antd'
import { Space, Table } from 'antd'
import { TweetType } from './tweet.type'

const TweetsList: React.FC = () => {
  const { tableProps, tableQuery } = useTable<TweetType>({ 
    resource: 'tweets', 
    pagination: { mode: 'off' },
    sorters: { mode: 'server' }
  })

  if (tableQuery.isLoading) {
    return <p>Loading...</p>
  }

  return (
    <List title='Tweets'>
      <Table { ...tableProps } rowKey='_id' pagination={{ pageSize: 10 }}>
        <Table.Column<TweetType> 
          title='Content' 
          dataIndex='content' 
          render={ (v) => <TextField value={ v } /> } 
        />

        <Table.Column<TweetType> 
          title='Author' 
          sorter={ (a, b) => (a.user.userName || '').localeCompare(b.user.userName || '') }
          render={ (_, r) => r.user?.userName ?? '—' } 
        />

        <Table.Column<TweetType> 
          title='Created' 
          dataIndex='createdAt' 
          sorter={ (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime() }
          render={ (v) => <DateField value={ v } format='YYYY-MM-DD HH:mm' /> } 
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

export default TweetsList