import { useQuery } from '@tanstack/react-query'
import blogRequest from '../requests/blogRequest'
import Blog from './Blog'

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogRequest.getAll,
  })

  if (result.isLoading) {
    return <div>loading blogs...</div>
  }

  const blogs = result.data
  console.log(result.data)

  return (
    <div>{blogs && blogs.map((blog) => <Blog key={blog.id} {...blog} />)}</div>
  )
}

export default BlogList
