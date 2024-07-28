import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import blogRequest from '../requests/blogRequest'
import Blog from './Blog'
import { useNotification } from '../providers/useContexts'
import { AxiosError } from 'axios'

const BlogList = () => {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogRequest.getAll,
  })

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

  const blogs = result.data
  console.log(result.data)

  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <Blog key={blog.id} {...blog} handleBlogDelete={handleBlogDelete} />
        ))}
    </div>
  )
}

export default BlogList
