import { useParams } from 'react-router-dom'
import BlogForm from '../components/BlogForm'
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
    <div className='flex flex-col items-center lg:w-9/12 lg:bg-black/60 p-4 lg:p-10'>
      <BlogForm blog={result.data} />
    </div>
  )
}

export default EditBlogPage
