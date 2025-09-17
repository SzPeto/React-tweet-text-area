import React from 'react'
import { List, useTable, TextField, ShowButton, EditButton, DeleteButton } from '@refinedev/antd'
import { Space, Table } from 'antd'
import { UserType } from './user.type'

export const UsersList: React.FC = () => {
  const { tableProps, tableQuery } = useTable<UserType>({ resource: 'users', pagination: { mode: 'off' } })

  if (tableQuery.isLoading) {
    return <p>Loading...</p>
  }

  return (
    <List title='Users'>
      <Table { ...tableProps } rowKey='_id'>
        <Table.Column<UserType> 
          title='User Name' 
          dataIndex='userName' 
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