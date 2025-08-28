
export const addUser = async (userName: string, email: string, password: string) => {
  const user = {
    userName: userName,
    email: email,
    password: password
  }

  const response = await fetch('/api/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })

  return await response.json()
}