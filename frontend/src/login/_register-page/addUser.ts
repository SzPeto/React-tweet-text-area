
export const addUser = async (userName: string, email: string, password: string) => {
  let json

  const user = {
    userName: userName,
    email: email,
    password: password
  }

  try {
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    json = await response.json()
  } catch(err) {
    json = null
    console.log('Error upon registering user : ', err)
  }

  return await json
}