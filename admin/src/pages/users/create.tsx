import { useForm, Create } from '@refinedev/antd'
import { Form, Input } from 'antd'

export const UserCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({ redirect: 'edit' })

  return (
    <Create saveButtonProps={ saveButtonProps }>
      <Form { ...formProps } layout='vertical'>
        <Form.Item label='Username' name='userName'>
          <Input />
        </Form.Item>

        <Form.Item label='Email' name='email'>
          <Input type='email' />
        </Form.Item>

        <Form.Item label='Password' name='password'>
          <Input type='password' />
        </Form.Item>
      </Form>
    </Create>
  )
}