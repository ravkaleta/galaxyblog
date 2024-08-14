import BlogList from '../components/BlogList'

const HomePage = () => {
  return (
    <div className='flex-1'>
      <div className='flex flex-col items-center justify-center'>
        <BlogList />
      </div>
    </div>
  )
}

export default HomePage
