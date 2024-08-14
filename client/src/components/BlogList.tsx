import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogRequest from '../requests/blogRequest'
import Blog from './Blog'
import { useNotification, useUser } from '../providers/useContexts'
import { AxiosError } from 'axios'

const BlogList = () => {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogRequest.getAll,
  })

  const { user } = useUser()

  const { setTempNotification } = useNotification()

  const deleteBlogMutation = useMutation({
    mutationFn: blogRequest.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      setTempNotification('success', 'Succesfully deleted blog!', 5)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setTempNotification('error', error.response?.data, 5)
      } else {
        console.error(error)
        setTempNotification('error', error.message, 5)
      }
    },
  })

  if (result.isLoading) {
    return <div>loading blogs...</div>
  }

  const handleBlogDelete = (blogId: string) => {
    deleteBlogMutation.mutate(blogId)
  }

  const blogs = result.data ? result.data.slice(0, 10) : []
  console.log(result.data)

  return (
    <div className='w-full'>
      <h2 className='text-white text-4xl font-extrabold text-center border-b border-white pb-6'>
        Recent Blogs
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
        {blogs &&
          blogs.map((blog) => (
            <div key={blog.id} className='flex items-center justify-center'>
              <Blog
                blog={blog}
                user={user}
                handleBlogDelete={handleBlogDelete}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default BlogList
