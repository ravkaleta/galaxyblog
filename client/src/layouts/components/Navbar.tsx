import { Link } from 'react-router-dom'
import { useUser } from '../../providers/useContexts'
import requestConfig from '../../requests/requestConfig'

const Navbar = () => {
  const { user, setUser } = useUser()

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    requestConfig.setToken('')
  }

  return (
    <nav>
      <Link to='/login'>login</Link>
      <div>
        {user && (
          <p style={{ textAlign: 'center' }}>
            {user.username}
            <button onClick={handleLogout}>log out</button>
          </p>
        )}
      </div>
    </nav>
  )
}

export default Navbar
