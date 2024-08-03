import { ChangeEvent, SyntheticEvent, useState } from 'react'
import useField from '../hooks/useField'
import blogRequest from '../requests/blogRequest'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../providers/useContexts'
import { Blog } from '../types'
import { AxiosError } from 'axios'

interface BlogFormProps {
  prevTitle?: string
  prevText?: string
  blogId?: string
  editMode?: boolean
}

const BlogForm = ({
  prevTitle = '',
  prevText = '',
  blogId = '',
  editMode = false,
}: BlogFormProps) => {
  const queryClient = useQueryClient()
  const title = useField('text', prevTitle)
  const text = useField('text', prevText)
  const [image, setImage] = useState<Blob | null>(null)

  const { setTempNotification } = useNotification()

  const addBlogMutation = useMutation({
    mutationFn: blogRequest.add,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData<Blog[]>(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs ? blogs.concat(newBlog) : [newBlog]
      )
      setTempNotification('success', 'Succesfully added new blog', 5)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setTempNotification('error', error.response?.data, 5)
      } else {
        setTempNotification('error', error.message, 5)
      }
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: (args: { objId: string; obj: FormData }) =>
      blogRequest.update(args.objId, args.obj),
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData<Blog[]>(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs?.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog))
      )
      setTempNotification('success', 'Succesfully updated blog', 5)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setTempNotification('error', error.response?.data, 5)
      } else {
        setTempNotification('error', error.message, 5)
      }
    },
  })

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setImage(file)
    }
  }

  const saveBlog = async (event: SyntheticEvent) => {
    event.preventDefault()
    const formData = new FormData()
    if (image) {
      formData.append('image', image)
      console.log(formData)
    }
    formData.append('title', title.input.value)
    formData.append('text', text.input.value)
    console.log(title.input.value)
    if (editMode) {
      updateBlogMutation.mutate({ objId: blogId, obj: formData })
    } else {
      addBlogMutation.mutate(formData)
    }
  }

  return (
    <form onSubmit={saveBlog}>
      <h2>{editMode ? 'edit blog' : 'new blog'}</h2>
      <div>
        title
        <input {...title.input} />
      </div>
      <div>
        text
        <input {...text.input} />
      </div>
      <div>
        image
        <input type='file' onChange={handleImageChange} />
      </div>
      <button type='submit'>add blog</button>
    </form>
  )
}

export default BlogForm
