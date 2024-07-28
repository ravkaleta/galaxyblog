import { SyntheticEvent } from 'react'
import useField from '../hooks/useField'
import accountRequest from '../requests/accountRequest'
import { useMutation } from '@tanstack/react-query'
import { useNotification, useUser } from '../providers/useContexts'
import { AxiosError } from 'axios'

const LoginForm = () => {
  const email = useField('text')
  const password = useField('password')

  const { setUser } = useUser()
  const { setTempNotification } = useNotification()

  const loginMutation = useMutation({
    mutationFn: accountRequest.login,
    onSuccess: (response) => {
      const userToken = response.data
      setUser(userToken)
      localStorage.setItem('user', JSON.stringify(userToken))
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setTempNotification('error', error.response?.data, 5)
      } else {
        console.error(error)
        setTempNotification('error', error.message, 5)
      }
    },
  })

  const login = (event: SyntheticEvent) => {
    event.preventDefault()

    const loginData = {
      email: email.input.value,
      password: password.input.value,
    }
    loginMutation.mutate(loginData)

    email.reset()
    password.reset()
  }

  return (
    <form onSubmit={login}>
      <h2>sign in</h2>
      <div>
        email
        <input {...email.input} />
      </div>
      <div>
        password
        <input {...password.input} />
      </div>
      <button type='submit'>sign in</button>
    </form>
  )
}

export default LoginForm
