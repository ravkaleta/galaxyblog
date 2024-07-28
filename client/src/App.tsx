import { useEffect } from 'react'
import Home from './pages/Home'
import { useUser } from './providers/useContexts'
import Notification from './components/Notification'

const App = () => {
  const { setUser } = useUser()

  useEffect(() => {
    const userToken = localStorage.getItem('user')
    if (userToken) {
      const userData = JSON.parse(userToken)
      console.log(userData)
      setUser(userData)
    }
  }, [])

  return (
    <div>
      <Notification />
      <Home />
    </div>
  )
}

export default App
