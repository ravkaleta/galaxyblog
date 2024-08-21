import { Blog as IBlog } from '../types'
import { IUserType } from '../providers/UserProvider'
import { Star } from 'react-feather'

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
    <div
      className={`flex flex-col hover:scale-105 hover:shadow-[0_0_40px_rgba(0,200,150,0.1)] transition-all  justify-between  h-64 min-w-96 bg-white bg-opacity-5 bg-cover bg-center border border-black text-white m-10 `}
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
          <img
            src='/logo.png'
            alt=''
            className='w-full h-full object-contain'
          />
        </div>
      )}
      <div className='relative w-full h-2/5 bg-primary-950 text-gray-300'>
        <div className='mt-2 ml-2 w-4/5 h-4/5'>
          <h3 className='line-clamp-2'>{blog.title}</h3>
        </div>
        <div className='absolute flex justify-between w-full bottom-0 px-2 pb-2 text-white'>
          <span>READ MORE</span>
          <div className='flex gap-x-2'>
            {blog.avgRating ? Math.round(blog.avgRating * 100) / 100 : 0} / 5
            <div className='flex'>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`inline-block`}
                  fill={`${index + 1 <= blog.avgRating ? 'white' : 'transparent'}`}
                />
              ))}
            </div>
            ({blog.totalRatings ? blog.totalRatings : 0})
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog
