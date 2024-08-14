import { Blog as IBlog } from '../types'
import { IUserType } from '../providers/UserProvider'

import { Link } from 'react-router-dom'

interface BlogProps {
  blog: IBlog
  user: IUserType
  handleBlogDelete: (blogId: string) => void
}

const Blog = ({ blog }: BlogProps) => {
  const blogDate = new Date(blog.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Link
      to='/blog'
      className={`flex flex-col hover:scale-110 hover:shadow-[0_0_40px_rgba(0,200,150,0.1)] transition-all  justify-between w-96 h-64 min-w-80 bg-white bg-opacity-5 bg-cover bg-center border border-black text-white m-10 `}
      style={{ backgroundImage: `url('api/images/${blog.imageUrl}')` }}
    >
      <div className='w-10/12 p-1 bg-black clip-blog-header shadow-md'>
        <p className='ml-3'>
          {blogDate} by
          <span className='text-secondary-500'> {blog.authorName}</span>
        </p>
      </div>
      {!blog.imageUrl && (
        <div className='flex items-center justify-center h-2/5'>
          <img src='logo.png' alt='' className='w-full h-full object-contain' />
        </div>
      )}
      <div className='w-full h-2/5 bg-primary-950 text-gray-300'>
        <h3 className='m-2'>{blog.text}</h3>
      </div>
    </Link>
  )
}

export default Blog
