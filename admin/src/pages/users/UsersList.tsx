import React from 'react'
import { List, useTable, TextField, ShowButton, EditButton, DeleteButton } from '@refinedev/antd'
import { Space, Table } from 'antd'
import { UserType } from './user.type'

const UsersList: React.FC = () => {
  const { tableProps, tableQuery } = useTable<UserType>({ 
    resource: 'users', 
    pagination: { mode: 'off' },
    sorters: { mode: 'server' }
  })

  if (tableQuery.isLoading) {
    return <p>Loading...</p>
  }

  return (
    <List title='Users'>
      <Table { ...tableProps } rowKey='_id' pagination={{ pageSize: 10 }}>
        <Table.Column<UserType> 
          title='User Name' 
          dataIndex='userName' 
          sorter={ (a, b) => (a.userName || '').localeCompare(b.userName || '') }
          render={ (v) => ( <TextField value={ v } />) } 
        />

        <Table.Column<UserType> 
          title='Email' 
          dataIndex='email' 
          render={ (v) => <TextField value={ v } /> } 
        />

        <Table.Column<UserType>
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

export default UsersList