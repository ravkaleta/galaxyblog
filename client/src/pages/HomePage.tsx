import NewBlogs from '../components/NewBlogs'
import TopBlogs from '../components/TopBlogs'

const HomePage = () => {
  return (
    <div className='w-11/12 mt-8 lg:mt-0 lg:w-9/12'>
      <TopBlogs />
      <NewBlogs />
    </div>
  )
}

export default HomePage
