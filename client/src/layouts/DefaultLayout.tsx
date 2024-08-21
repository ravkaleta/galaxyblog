import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const DefaultLayout = () => {
  return (
    <div className='bg-primary-950 flex flex-col items-center min-h-screen'>
      <div className='block fixed bg-gradient-to-t from-secondary-500 to-primary-400 w-20 h-full -translate-y-64 right-1/4 blur-[90px] rotate-[-60deg]'></div>
      <div className='block fixed bg-gradient-to-t from-amber-400 to-primary-400 w-16 h-full  top-1/4 left-1/4 blur-[90px] rotate-[-45deg] '></div>

      <Navbar />

      <div className='w-full flex-grow z-10 mt-40'>
        <Outlet />
      </div>
      <div className='w-full h-16 flex items-center justify-center'>
        <Footer />
      </div>
    </div>
  )
}

export default DefaultLayout
