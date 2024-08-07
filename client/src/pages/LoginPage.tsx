import { useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useUser } from '../providers/useContexts'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const { user } = useUser()

  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user, navigate])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}
    >
      <LoginForm />
      <RegisterForm />
    </div>
  )
}

export default LoginPage
