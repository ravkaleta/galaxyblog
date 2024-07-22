import BlogList from '../components/BlogList'
import LoginForm from '../components/LoginForm'
import NewBlogForm from '../components/NewBlogForm'
import RegisterForm from '../components/RegisterForm'

const Home = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <LoginForm />
        <RegisterForm />
      </div>
      <NewBlogForm />
      <BlogList />
    </div>
  )
}

export default Home
