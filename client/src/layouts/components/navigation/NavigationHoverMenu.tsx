import { Menu } from 'react-feather'
import { Link } from 'react-router-dom'
import { IUser } from '../../../providers/UserProvider'

interface props {
  user: IUser
  handleLogout: () => void
}

const NavigationHoverMenu = ({ user, handleLogout }: props) => {
  return (
    <div className='group relative inline-block'>
      <div className='hidden lg:flex items-center w-36 justify-between border border-gray-700 px-4 py-2 lg:group-hover:w-40 lg:group-hover:bg-white lg:group-hover:bg-opacity-5 transition-all bg-black bg-opacity-30 rounded-md'>
        <p>{user.username}</p>
        <Menu size='18px' />
      </div>

      <div className='absolute hidden lg:group-hover:block ml-2 w-11/12'>
        <Link
          to='/'
          className='w-full text-center block border-b border-x border-gray-700 py-1 backdrop-blur-xl bg-black bg-opacity-75 hover:bg-white hover:bg-opacity-5'
        >
          New Blog
        </Link>
        <Link
          to='/user'
          className='w-full text-center block border-b border-x border-gray-700 py-1 backdrop-blur-xl bg-black bg-opacity-75 hover:bg-white hover:bg-opacity-5'
        >
          My profile
        </Link>
        <button
          onClick={handleLogout}
          className='w-full block border-b border-x border-gray-700 py-1 backdrop-blur-xl bg-black bg-opacity-75 hover:bg-white hover:bg-opacity-5'
        >
          Log out
        </button>
      </div>
    </div>
  )
}

export default NavigationHoverMenu
