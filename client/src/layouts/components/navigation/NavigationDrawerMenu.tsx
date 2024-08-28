import { Link } from 'react-router-dom'
import { X } from 'react-feather'
import React from 'react'
import { IUserType } from '../../../providers/UserProvider'

interface Props {
  isMenuVisible: boolean
  handleVisibility: () => void
  handleLogout: () => void
  user: IUserType
}

const NavigationDrawerMenu = ({
  user,
  handleLogout,
  handleVisibility,
  isMenuVisible,
}: Props) => {
  const options = [
    {
      category: 'Pages',
      links: [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Blogs', link: '/' },
      ],
    },

    {
      category: 'Account',
      links: user
        ? [
            { name: 'New blog', link: '/blog/new' },
            { name: 'My profile', link: `/user/${user?.id}` },
          ]
        : [],
    },
  ]

  return (
    <div className='w-full absolute'>
      {isMenuVisible && (
        <button
          onClick={handleVisibility}
          className='block top-0 bg-black/25 backdrop-blur-sm fixed h-screen w-full lg:hidden z-30'
        ></button>
      )}
      <div
        className={`fixed text-white min-h-screen top-0 right-0 h-screen w-2/3 z-30 transition-all ${isMenuVisible ? 'translate-x-0' : 'translate-x-full'} lg:hidden bg-black bg-opacity-80 backdrop-blur-lg z-40`}
      >
        <div className='flex flex-col p-4'>
          <div className='text-2xl font-bold w-full flex justify-between'>
            <p>Menu</p>
            <button onClick={handleVisibility}>
              <X size='40px' />
            </button>
          </div>

          <ul className='flex text-lg w-full text-center flex-col gap-y-4 mt-4'>
            {options.map((option) => (
              <React.Fragment key={option.category}>
                <h2 className='text-md text-center text-gray-500 font-mono'>
                  {option.category}
                </h2>
                {option.links.map((link) => (
                  <li key={link.name} className=''>
                    <Link to={link.link} onClick={handleVisibility}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </React.Fragment>
            ))}

            <li>
              {user ? (
                <button onClick={handleLogout}>Log out</button>
              ) : (
                <Link to='/login'>Log in</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavigationDrawerMenu
