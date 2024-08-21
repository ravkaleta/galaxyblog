import { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useUser } from '../providers/useContexts'
import { Link, useNavigate } from 'react-router-dom'
import Notification from '../components/Notification'
import Button from '../components/ui/form/Button'

const LoginPage = () => {
  const { user } = useUser()
  const [form, setForm] = useState<'login' | 'register'>('login')

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div className='flex flex-col h-screen w-screen items-center justify-center bg-login-background bg-cover bg-center'>
      <Link to='/' className='flex-[2] flex justify-center items-center'>
        <img
          src='logo1.png'
          alt='Website logo'
          width={'200'}
          className='transition-all duration-300 ease-in-out hover:drop-shadow-[0_0px_50px_rgba(255,255,255,0.5)] hover:scale-110'
        />
      </Link>
      <div className='flex-[5] flex w-screen items-start justify-center'>
        <div className='flex flex-col w-5/6 max-w-md xl:max-w-4xl p-4 py-6 pb-8 border rounded-2xl backdrop-blur-sm bg-black bg-opacity-15 items-center'>
          <Notification className='absolute top-2 text-xl border-red-500 bg-black bg-opacity-75 border p-1 px-4 rounded-md' />
          <div className='font-sans w-full flex flex-row items-center '>
            <div
              className={`w-full xl:w-1/2 ${form !== 'login' && 'hidden'} xl:block mb-4 xl:mb-0`}
            >
              <LoginForm />
            </div>
            <div
              className={`w-full xl:w-1/2 ${form !== 'register' && 'hidden'} xl:block xl:border-l`}
            >
              <RegisterForm />
            </div>
          </div>
          <div className={`flex flex-col items-center px-6 w-full xl:hidden`}>
            <p className='text-white'>
              <span className='flex items-center before:content-[""] before:inline-block before:h-[1px] before:w-20 before:bg-white before:mr-2 after:content-[""] after:inline-block after:h-[1px] after:w-20 after:bg-white after:ml-2'>
                or
              </span>
            </p>
            <Button
              type='button'
              className={`mt-4 bg-transparent backdrop-blur-md border hover:bg-transparent hover:text-white`}
              onClick={() => setForm(form === 'login' ? 'register' : 'login')}
            >
              {form === 'login' ? 'Sign up' : 'Sign in'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
