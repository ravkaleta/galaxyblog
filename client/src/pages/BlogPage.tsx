import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import blogRequest from '../requests/blogRequest'
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
import { Edit, Trash } from 'react-feather'
import BlogFeedback from '../components/BlogFeedback'
import PageHeader from './components/PageHeader'
import { useUser } from '../providers/useContexts'
import BlogRating from '../components/ui/BlogRating'

const BlogPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useUser()

  const result = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogRequest.getById(id),
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogRequest.remove,
    onSuccess: () => {
      console.log('deleted blog')
      navigate('/')
    },
    onError: (error) => console.error(error),
  })

  const handleBlogDelete = () => {
    deleteBlogMutation.mutate(blog.id)
  }

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.error || !result.data) {
    return <div>Couldn't fetch blog data</div>
  }

  const blog = result.data

  const avgRating = blog.avgRating ? blog.avgRating : 0
  const totalRatings = blog.totalRatings ? blog.totalRatings : 0

  return (
    <div className='flex flex-col items-center w-full lg:w-9/12 lg:bg-black/60 p-4 lg:p-10'>
      <div className='w-full flex justify-between items-center mb-2'>
        <div className='text-white'>
          <BlogRating avgRating={avgRating} />
          <p className='mt-2 text-base text-center'>
            {!avgRating
              ? 'No ratings yet'
              : `${Math.round(avgRating * 100) / 100} / 5 (${totalRatings})`}
          </p>
        </div>
        <div className={user && blog.authorId === user.id ? 'block' : 'hidden'}>
          <button
            onClick={handleBlogDelete}
            className='w-24 py-2 mr-2 transition-all duration-300 hover:scale-105 shadow-none hover:shadow-md hover:shadow-red-800 text-red-600 bg-transparent border-2 border-red-600 rounded-lg'
          >
            Delete <Trash className='inline-block' size='20px' />
          </button>
          <button
            onClick={() => navigate(`/blog/edit/${blog.id}`)}
            className='w-24 py-2 shadow-none bg-gradient-to-tr hover:scale-105 hover:shadow-amber-800 transition-all ease-in-out duration-300 hover:shadow-md text-amber-600 bg-tranparent border-2 border-amber-600 rounded-lg'
          >
            Edit <Edit className='inline-block' size='20px' />
          </button>
        </div>
      </div>
      <PageHeader text={blog.title} />
      <h3 className='text-white'>
        by{' '}
        <Link to={`/user/${blog.authorId}`} className='text-secondary-500'>
          {blog.authorName}
        </Link>
      </h3>
      <div className='w-full flex flex-col items-center justify-center py-4 text-white text-xl '>
        <img
          src={`/api/images/${blog.imageUrl}`}
          alt='Blog image'
          className='rounded-3xl max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl max-h-[36rem] md:max-h-[56rem] lg:max-h-[64rem]'
        />
        <p className='mt-4 w-full text-white text-xl text-balance whitespace-pre-line'>
          {blog.text}
        </p>

        <BlogFeedback blogId={blog.id} />
      </div>

      <h2 className='w-full border-t border-gray-500 text-white text-center text-xl lg:text-2xl py-4'>
        Comments
      </h2>

      <div className='w-4/5'>
        <CommentForm blogId={blog.id} />
        <CommentList blogId={blog.id} />
      </div>
    </div>
  )
}

export default BlogPage
