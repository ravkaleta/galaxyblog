import { SyntheticEvent } from 'react'
import useField from '../hooks/useField'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')

  const login = (event: SyntheticEvent) => {
    event.preventDefault()

    const loginData = {
      username: username.value,
      password: password.value,
    }

    console.log(loginData)
  }

  return (
    <form onSubmit={login}>
      <h2>sign in</h2>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <button type='submit'>sign in</button>
    </form>
  )
}

export default LoginForm
