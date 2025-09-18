import { useForm, Create } from '@refinedev/antd'
import { Form, Input } from 'antd'

const TweetCreate: React.FC = () => {
  const { formProps, saveButtonProps } = useForm({ redirect: 'edit' })

  return (
    <Create saveButtonProps={ saveButtonProps }>
      <Form { ...formProps } layout='vertical'>
        <Form.Item label='Content' name='content'>
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Create>
  )
}

export default TweetCreate