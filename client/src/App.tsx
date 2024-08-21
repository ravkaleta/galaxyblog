import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import { useUser } from './providers/useContexts'
import requestConfig from './requests/requestConfig'
import { IUser } from './providers/UserProvider'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import DefaultLayout from './layouts/DefaultLayout'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import NewBlogPage from './pages/NewBlogPage'
import EditBlogPage from './pages/EditBlogPage'

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
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '',
          element: <HomePage />,
        },
        {
          path: 'about',
          element: <AboutPage />,
        },
        {
          path: 'blog/:id',
          element: <BlogPage />,
        },
        {
          path: 'blog/new',
          element: <NewBlogPage />,
        },
        {
          path: 'blog/edit/:id',
          element: <EditBlogPage />,
        },
      ],
    },
    { path: '/login', element: <LoginPage /> },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
