import BlogForm from '../components/BlogForm'
import PageContainer from './components/PageContainer'

const NewBlogPage = () => {
  return (
    <PageContainer className='lg:bg-black/60 p-10'>
      <BlogForm />
    </PageContainer>
  )
}

export default NewBlogPage
