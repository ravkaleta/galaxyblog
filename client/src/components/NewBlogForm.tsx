import { ChangeEvent, SyntheticEvent, useState } from 'react'
import useField from '../hooks/useField'
import blogRequest from '../requests/blogRequest'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../providers/useContexts'
import { Blog } from '../types'
import { AxiosError } from 'axios'

const NewBlogForm = () => {
  const queryClient = useQueryClient()
  const title = useField('text')
  const text = useField('text')
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      setImage(file)
    }
  }

  const addBlog = async (event: SyntheticEvent) => {
    event.preventDefault()
    const formData = new FormData()
    if (image) {
      formData.append('image', image)
      console.log(formData)
    }
    const newBlog = {
      title: title.input.value,
      text: text.input.value,
    }
    console.log(newBlog)
    formData.append('title', title.input.value)
    formData.append('text', text.input.value)
    addBlogMutation.mutate(formData)
  }

  return (
    <form onSubmit={addBlog}>
      <h2>new blog</h2>
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

export default NewBlogForm
