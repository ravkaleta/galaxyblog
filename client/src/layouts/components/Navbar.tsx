import { Link } from 'react-router-dom'
import { useUser } from '../../providers/useContexts'
import requestConfig from '../../requests/requestConfig'
import { Menu } from 'react-feather'
import { useEffect, useState } from 'react'
import NavigationDrawerMenu from './navigation/NavigationDrawerMenu'
import NavigationHoverMenu from './navigation/NavigationHoverMenu'
import NavigationDesktopMenu from './navigation/NavigationDesktopMenu'

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
    localStorage.removeItem('user')
    requestConfig.setToken('')
  }

  return (
    <nav
      className={`fixed w-full transition-all ${isScrolled ? 'h-20' : 'h-40'} flex items-center justify-center z-20`}
    >
      {/* Clickable layer under drawer menu */}
      {isMenuVisible && (
        <button
          onClick={() => setMenuVisible(false)}
          className='block top-0 bg-black bg-opacity-25 backdrop-blur-sm fixed h-screen w-full lg:hidden z-20'
        ></button>
      )}
      {/*  */}

      <NavigationDrawerMenu
        handleLogout={handleLogout}
        handleVisibility={() => setMenuVisible(false)}
        isMenuVisible={isMenuVisible}
      />

      {/* Visible menu bar */}
      <div
        className={`text-white flex items-center justify-between transition-all h-20 ${isScrolled ? 'w-full' : 'w-11/12'}  backdrop-blur-xl bg-black bg-opacity-50`}
      >
        <Link
          to='/'
          className='w-2/5 lg:w-1/5 flex items-center justify-center'
        >
          <img src='/logo2.png' alt='Website logo' width={'145px'} />
        </Link>
        <NavigationDesktopMenu />
        <div className='w-2/5 lg:w-1/5 flex items-center justify-end lg:justify-normal '>
          {user ? (
            <>
              {/* Mobile menu button */}
              <button
                onClick={() => setMenuVisible(!isMenuVisible)}
                className='lg:hidden flex items-end justify-center mr-10 border p-2 rounded-md bg-black bg-opacity-30'
              >
                <Menu size='24px' />
              </button>
              {/*  */}

              <NavigationHoverMenu user={user} handleLogout={handleLogout} />
            </>
          ) : (
            <Link
              to='/login'
              className='w-36 mr-10 lg:mr-0 text-center py-2 rounded-md text-white bg-gradient-to-br from-primary-800 to-secondary-800 lg:hover:scale-110 transition-transform ease-in-out duration-700'
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
