import BlogList from '../components/BlogList'
import BlogForm from '../components/BlogForm'
import Navbar from '../layouts/components/Navbar'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <BlogForm />
      <BlogList />
    </div>
  )
}

export default HomePage
