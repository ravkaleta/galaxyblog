import { Link, useLocation } from 'react-router-dom'

const NavigationDesktopMenu = () => {
  const location = useLocation()

  const options = [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Blogs', link: '/search' },
  ]

  return (
    <div className='w-2/5 xl:w-1/3 hidden sm:flex items-center relative text-xl justify-between'>
      {options.map((option) => (
        <Link
          key={option.name}
          to={option.link}
          className={`relative px-4 py-2 after:block after:absolute after:content=[""] after:bg-white after:left-0 after:bottom-0 after:h-1
             after:transition-all ${location.pathname === option.link ? 'after:w-full' : 'after:w-0'} hover:after:w-full`}
        >
          {option.name}
        </Link>
      ))}
    </div>
  )
}

export default NavigationDesktopMenu
