import { useQuery } from '@tanstack/react-query'
import HorizontalList from './ui/HorizontalList'
import blogRequest from '../requests/blogRequest'
import { Link } from 'react-router-dom'
import Blog from './Blog'

const NewBlogs = () => {
  const result = useQuery({
    queryKey: ['newBlogs'],
    queryFn: () => blogRequest.getNew(10),
  })

  return (
    <HorizontalList header='New Blogs' className='my-8'>
      {result.isLoading
        ? 'loading data...'
        : result.data
          ? result.data.map((blog) => (
              <Link key={blog.id} to={`/blog/${blog.id}`}>
                <Blog blog={blog} />
              </Link>
            ))
          : 'No blogs'}
    </HorizontalList>
  )
}

export default NewBlogs
