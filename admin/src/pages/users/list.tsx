import React from 'react'
import type { BaseRecord } from '@refinedev/core'
import { List, useTable, TextField } from '@refinedev/antd'
import { Table } from 'antd'

type User = BaseRecord & { 
  _id: string,
  userName: string,
  email: string
}

export const UsersList: React.FC = () => {
  const { tableProps } = useTable<User>({ resource: 'users', pagination: { mode: 'off' } })

  return (
    <List title='Users'>
      <Table {...tableProps} rowKey='_id'>
        <Table.Column<User> title='User Name' dataIndex='userName' render={(v) => <TextField value={v} />} />
        <Table.Column<User> title='Email' dataIndex='email' render={(v) => <TextField value={v} />} />
      </Table>
    </List>
  )
}