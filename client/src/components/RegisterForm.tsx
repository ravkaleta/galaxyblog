import { useMutation } from '@tanstack/react-query'
import useField from '../hooks/useField'
import { SyntheticEvent } from 'react'
import accountRequest from '../requests/accountRequest'
import { useNotification } from '../providers/useContexts'
import { AxiosError } from 'axios'
import Button from './ui/form/Button'
import Label from './ui/form/Label'
import Input from './ui/form/Input'
import FormField from './ui/form/FormField'

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
    <form
      onSubmit={register}
      className=' flex-1 flex flex-col px-6 py-4 gap-y-8 '
    >
      <h2 className='text-center text-white text-3xl'>Sign up</h2>
      <FormField>
        <Label htmlFor='registerEmail'>Email:</Label>
        <Input id='registerEmail' {...email.input} placeholder='Email' />
      </FormField>
      <FormField>
        <Label htmlFor='registerUsername'>Username:</Label>
        <Input
          id='registerUsername'
          {...username.input}
          placeholder='Username'
        />
      </FormField>
      <FormField>
        <Label htmlFor='registerPassword'>Password:</Label>
        <Input
          id='registerPassword'
          {...password.input}
          placeholder='Password'
        />
      </FormField>
      <FormField>
        <Label htmlFor='registerConfirmPassword'>Confirm Password:</Label>
        <Input
          id='registerConfirmPassword'
          {...repeatPassword.input}
          placeholder='Confirm Password'
        />
      </FormField>
      <Button type='submit' className='block mx-auto'>
        Create account
      </Button>
    </form>
  )
}

export default RegisterForm
