import { z } from 'zod'

export const schema = z.object({
  userName: z.string().min(3, 'Username has to be at least 3 characters').nonempty('Username required!'),
  password: z.string().min(6, 'Password has to be at least 6 characters long').nonempty('Password required!')
})