import { useParams } from 'react-router-dom'
import BlogForm from '../components/BlogForm'
import PageContainer from './components/PageContainer'
import { useQuery } from '@tanstack/react-query'
import blogRequest from '../requests/blogRequest'

const EditBlogPage = () => {
  const { id } = useParams()

  const result = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogRequest.getById(id),
  })

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (!result.data) {
    return <div>Blog no longer exists</div>
  }

  return (
    <PageContainer className='lg:bg-black/60 p-10'>
      <BlogForm blog={result.data} />
    </PageContainer>
  )
}

export default EditBlogPage
