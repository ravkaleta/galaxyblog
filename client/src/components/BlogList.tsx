import Blog from './Blog'
import { Link } from 'react-router-dom'
import { Blog as IBlog } from '../types'

const BlogList = ({ blogs }: { blogs: IBlog[] }) => {
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
      {blogs &&
        blogs.map((blog) => (
          <Link
            to={`/blog/${blog.id}`}
            key={blog.id}
            className='flex items-center justify-center'
          >
            <Blog blog={blog} />
          </Link>
        ))}
    </div>
  )
}

export default BlogList
