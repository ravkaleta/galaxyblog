import useField from '../hooks/useField'
import { SyntheticEvent } from 'react'

const RegisterForm = () => {
  const username = useField('text')
  const password = useField('password')
  const repeatPassword = useField('password')

  const register = (event: SyntheticEvent) => {
    event.preventDefault()

    const registeData = {
      username: username.value,
      password: password.value,
      repeatPassword: repeatPassword.value,
    }

    console.log(registeData)
  }

  return (
    <form onSubmit={register}>
      <h2>sign up</h2>
      <div>
        username
        <input {...username} />
      </div>
      <div>
        password
        <input {...password} />
      </div>
      <div>
        repeatPassword
        <input {...repeatPassword} />
      </div>
      <button type='submit'>sign up</button>
    </form>
  )
}

export default RegisterForm
