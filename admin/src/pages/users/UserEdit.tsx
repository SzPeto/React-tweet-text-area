import { Edit, useForm } from '@refinedev/antd'
import { Form, Input } from 'antd'

const UserEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({ redirect: 'show' })

  return (
    <Edit saveButtonProps={ saveButtonProps }>
      <Form { ...formProps } layout='vertical'>
        <Form.Item label='Username' name='userName'>
          <Input />
        </Form.Item>

        <Form.Item label='Email' name='email'>
          <Input type='email' />
        </Form.Item>
      </Form>
    </Edit>
  )
}

export default UserEdit