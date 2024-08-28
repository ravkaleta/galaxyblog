import { useQuery } from '@tanstack/react-query'
import HorizontalList from './ui/HorizontalList'
import blogRequest from '../requests/blogRequest'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const TopBlogs = () => {
  const result = useQuery({
    queryKey: ['topBlogs'],
    queryFn: () => blogRequest.getTop(10),
  })

  return (
    <HorizontalList header='Top Blogs'>
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

export default TopBlogs
