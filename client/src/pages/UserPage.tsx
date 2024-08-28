import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import userRequest from '../requests/userRequest'
import { Star } from 'react-feather'
import HorizontalList from '../components/ui/HorizontalList'
import Blog from '../components/Blog'
import { Blog as IBlog } from '../types'

const UserPage = () => {
  const { id } = useParams()
  console.log(id)

  const result = useQuery({
    queryKey: ['user', id],
    queryFn: () => userRequest.getWithDetails(id),
  })

  if (result.isLoading) {
    return <div>loading user data...</div>
  }

  if (result.error || !result.data) {
    return <div>Couldn't fetch user data</div>
  }

  const user = result.data
  console.log(result.data)

  const userBlogsLength = user.blogs.length
  const averageRating = user.blogs
    ? Math.round(
        (user.blogs.reduce((acc, blog) => acc + blog.avgRating, 0) /
          userBlogsLength) *
          100
      ) / 100
    : 0

  return (
    <div className='flex flex-col items-center w-11/12 lg:w-9/12 mt-8 lg:mt-0 text-white gap-y-6'>
      <h1 className='min-w-64 text-center text-4xl font-extrabold px-4 pb-2 border-b border-white'>
        {user.username}
      </h1>
      <div className='space-y-4 text-center'>
        <h2 className='text-lg font-bold'>
          Blogs published:{' '}
          <span className='block text-2xl'>{userBlogsLength}</span>
        </h2>
        <h2 className='flex flex-col items-center gap-y-4 text-lg font-bold'>
          Average Rating:
          <div className='flex mx-4'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={'25px'}
                className='inline-block '
                fill={`${index + 1 <= averageRating ? 'white' : 'transparent'}`}
              />
            ))}
          </div>
          <span className='text-base'>{averageRating} / 5</span>
        </h2>
      </div>
      <HorizontalList header='User Blogs'>
        {user.blogs.map((b) => {
          const blog: IBlog = {
            ...b,
            authorName: user.username,
            authorId: user.id,
          }

          return (
            <Link key={blog.id} to={`/blog/${blog.id}`}>
              <Blog blog={blog} />
            </Link>
          )
        })}
      </HorizontalList>
    </div>
  )
}

export default UserPage
