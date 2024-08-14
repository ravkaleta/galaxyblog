import { SyntheticEvent } from 'react'
import useField from '../hooks/useField'
import accountRequest from '../requests/accountRequest'
import { useMutation } from '@tanstack/react-query'
import { useNotification, useUser } from '../providers/useContexts'
import { AxiosError } from 'axios'
import requestConfig from '../requests/requestConfig'
import Button from './ui/form/Button'
import Input from './ui/form/Input'
import Label from './ui/form/Label'
import FormField from './ui/form/FormField'

const LoginForm = () => {
  const email = useField('text')
  const password = useField('password')

  const { setUser } = useUser()
  const { setTempNotification } = useNotification()

  const loginMutation = useMutation({
    mutationFn: accountRequest.login,
    onSuccess: (response) => {
      const userToken = response.data
      requestConfig.setToken(userToken.token)
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
    <form onSubmit={login} className='flex-1 flex flex-col px-6 pt-4 gap-y-8'>
      <h2 className='text-center text-white text-3xl'>Sign in</h2>
      <FormField>
        <Label htmlFor='loginEmail'>Email:</Label>
        <Input id='loginEmail' {...email.input} placeholder='Email' />
      </FormField>
      <FormField>
        <Label htmlFor='loginPassword'>Password:</Label>
        <Input id='loginPassword' {...password.input} placeholder='Password' />
      </FormField>
      <Button type='submit' className='block mx-auto'>
        Log in
      </Button>
    </form>
  )
}

export default LoginForm
