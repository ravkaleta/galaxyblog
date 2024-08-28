import { Menu } from 'react-feather'
import { Link } from 'react-router-dom'
import { IUser } from '../../../providers/UserProvider'

interface Props {
  user: IUser | null
  handleLogout: () => void
}

const NavigationHoverMenu = ({ user, handleLogout }: Props) => {
  if (!user) {
    return (
      <Link
        to='/login'
        className='hidden sm:inline-block w-36 text-center py-2 rounded-md text-white bg-gradient-to-br from-primary-800 to-secondary-800 hover:scale-110 transition-transform ease-in-out duration-700'
      >
        Login
      </Link>
    )
  }

  return (
    <div className='group relative hidden sm:inline-block'>
      <div className='flex items-center w-36 justify-between border border-gray-700 px-4 py-2 group-hover:bg-white group-hover:bg-opacity-5 transition-all bg-black/30 rounded-md'>
        <p>{user.username}</p>
        <Menu size='18px' />
      </div>

      <div className='absolute hidden group-hover:block ml-2 w-11/12'>
        <Link
          to='/blog/new'
          className='w-full text-center block border-b border-x border-gray-700 py-1 backdrop-blur-xl bg-black bg-opacity-75 hover:bg-white hover:bg-opacity-5'
        >
          New Blog
        </Link>
        <Link
          to={`/user/${user.id}`}
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
