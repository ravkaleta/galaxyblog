import { useEffect } from 'react'
import Home from './pages/Home'
import { useUser } from './providers/useContexts'
import Notification from './components/Notification'
import requestConfig from './requests/requestConfig'
import { IUser } from './providers/UserProvider'

const App = () => {
  const { setUser } = useUser()

  useEffect(() => {
    const userToken = localStorage.getItem('user')
    if (userToken) {
      const userData: IUser = JSON.parse(userToken)
      console.log(userData)
      requestConfig.setToken(userData.token)
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
