import BlogList from '../components/BlogList'
import LoginForm from '../components/LoginForm'
import BlogForm from '../components/BlogForm'
import RegisterForm from '../components/RegisterForm'
import { useUser } from '../providers/useContexts'
import requestConfig from '../requests/requestConfig'

const Home = () => {
  const { user, setUser } = useUser()

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    requestConfig.setToken('')
  }

  return (
    <div>
      {!user ? (
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
      ) : (
        <p style={{ textAlign: 'center' }}>
          {user.username}
          <button onClick={handleLogout}>log out</button>
        </p>
      )}
      <BlogForm />
      <BlogList />
    </div>
  )
}

export default Home
