import { Link } from 'react-router-dom'
import { useUser } from '../../providers/useContexts'
import requestConfig from '../../requests/requestConfig'
import { useEffect, useState } from 'react'
import NavigationDrawerMenu from './navigation/NavigationDrawerMenu'
import NavigationHoverMenu from './navigation/NavigationHoverMenu'
import NavigationDesktopMenu from './navigation/NavigationDesktopMenu'
import NavigationButtonMenu from './navigation/NavigationButtonMenu'
import SearchBar from '../../components/ui/SearchBar'
import { User } from 'react-feather'

const Navbar = () => {
  const { user, setUser } = useUser()
  const [isMenuVisible, setMenuVisible] = useState(false)
  const [isScrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    setMenuVisible(false)
    localStorage.removeItem('user')
    requestConfig.setToken('')
  }

  return (
    <nav
      className={`fixed w-full transition-all h-20 ${isScrolled ? 'lg:h-20' : 'lg:h-40'} flex items-center justify-center z-20`}
    >
      {/* Mobile drawer menu */}
      <NavigationDrawerMenu
        user={user}
        handleLogout={handleLogout}
        handleVisibility={() => setMenuVisible(false)}
        isMenuVisible={isMenuVisible}
      />

      {/* Visible menu bar */}
      <div
        className={`text-white flex items-center justify-between transition-all h-20 p-4 lg:px-24 w-full ${isScrolled ? 'lg:w-full' : 'lg:w-11/12'}  
          backdrop-blur-xl bg-black bg-opacity-50`}
      >
        {/* Website logo */}
        <Link to='/' className='flex items-center'>
          <img src='/logo2.png' alt='Website logo' width={'145px'} />
        </Link>

        {user ? (
          <Link
            to={`/user/${user.id}`}
            className='flex sm:hidden gap-x-2 items-center'
          >
            <User className='border w-8 h-8 p-1 rounded-full' />
            {user.username}
          </Link>
        ) : (
          <Link
            to='/login'
            className='inline-block sm:hidden w-36 text-center py-2 rounded-md text-white bg-gradient-to-br from-primary-800 to-secondary-800 hover:scale-110 transition-transform ease-in-out duration-700'
          >
            Login
          </Link>
        )}

        <NavigationDesktopMenu />

        <div className='hidden xl:block'>
          <SearchBar />
        </div>

        <NavigationButtonMenu
          handleMenuVisibility={() => setMenuVisible(!isMenuVisible)}
        />

        {/* Desktop hover menu */}
        <NavigationHoverMenu user={user} handleLogout={handleLogout} />
      </div>
    </nav>
  )
}

export default Navbar
