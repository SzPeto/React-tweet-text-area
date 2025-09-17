import { Edit, useForm } from '@refinedev/antd'
import { Form, Input } from 'antd'

export const TweetEdit: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({ redirect: 'show' })

  return (
    <Edit saveButtonProps={ saveButtonProps }>
      <Form { ...formProps } layout='vertical'>
        <Form.Item label='Content' name='content'>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Edit>
  )
}