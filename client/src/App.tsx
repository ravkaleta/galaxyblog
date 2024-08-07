import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import { useUser } from './providers/useContexts'
import Notification from './components/Notification'
import requestConfig from './requests/requestConfig'
import { IUser } from './providers/UserProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

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

  const router = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
  ])

  return (
    <div>
      <Notification />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
