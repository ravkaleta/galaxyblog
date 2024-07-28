import { useMutation } from '@tanstack/react-query'
import useField from '../hooks/useField'
import { SyntheticEvent } from 'react'
import accountRequest from '../requests/accountRequest'
import { useNotification } from '../providers/useContexts'
import { AxiosError } from 'axios'

const RegisterForm = () => {
  const email = useField('email')
  const username = useField('text')
  const password = useField('password')
  const repeatPassword = useField('password')

  const { setTempNotification } = useNotification()

  const registerMutation = useMutation({
    mutationFn: accountRequest.register,
    onSuccess: () => {
      setTempNotification('success', 'Succesfully created an account.', 5)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setTempNotification('error', error.response?.data, 5)
      } else {
        setTempNotification('error', error.message, 5)
      }
    },
  })

  const register = (event: SyntheticEvent) => {
    event.preventDefault()

    const registerData = {
      email: email.input.value,
      username: username.input.value,
      password: password.input.value,
      repeatPassword: repeatPassword.input.value,
    }

    registerMutation.mutate(registerData)

    email.reset()
    username.reset()
    password.reset()
    repeatPassword.reset()
  }

  return (
    <form onSubmit={register}>
      <h2>sign up</h2>
      <div>
        email
        <input {...email.input} />
      </div>
      <div>
        username
        <input {...username.input} />
      </div>
      <div>
        password
        <input {...password.input} />
      </div>
      <div>
        repeatPassword
        <input {...repeatPassword.input} />
      </div>
      <button type='submit'>sign up</button>
    </form>
  )
}

export default RegisterForm
