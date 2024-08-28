import { BlogWithoutText } from '../types'
import BlogRating from './ui/BlogRating'

interface BlogProps {
  blog: BlogWithoutText
}

const Blog = ({ blog }: BlogProps) => {
  const blogDate = new Date(blog.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div
      className={`relative flex justify-center hover:shadow-[0_0_40px_rgba(0,200,150,0.2)] transition-all w-80 h-56 lg:h-64 lg:w-96 bg-cover bg-center border border-black rounded-xl text-white m-1 lg:m-4 `}
      style={{ backgroundImage: `url('/api/images/${blog.imageUrl}')` }}
    >
      <div className='w-10/12 h-8 bg-black clip-blog-header shadow-md'>
        <p className='ml-3 text-center'>
          {blogDate} by
          <span className='text-secondary-500'> {blog.authorName}</span>
        </p>
      </div>
      {!blog.imageUrl && (
        <div className='flex items-center justify-center h-2/5'>
          <img
            src='/logo.png'
            alt=''
            className='w-full h-full object-contain'
          />
        </div>
      )}
      <div className='absolute bottom-0 w-full h-2/5 bg-gradient-to-tr from-black to-black/75 backdrop-blur-sm rounded-b-xl'>
        <div className='mt-2 ml-2 w-4/5 h-4/5'>
          <h3 className='line-clamp-2 font-medium'>{blog.title}</h3>
        </div>
        <div className='flex items-center justify-end gap-x-2 absolute w-full bottom-0 px-2 pb-2 text-white text-sm'>
          {blog.avgRating ? Math.round(blog.avgRating * 100) / 100 : 0} / 5
          <div className='flex'>
            <BlogRating avgRating={blog.avgRating} />
          </div>
          ({blog.totalRatings ? blog.totalRatings : 0})
        </div>
      </div>
    </div>
  )
}

export default Blog
