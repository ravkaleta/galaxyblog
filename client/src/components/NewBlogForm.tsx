import { ChangeEvent, SyntheticEvent, useState } from 'react'
import useField from '../hooks/useField'
import blogRequest from '../requests/blogRequest'

const NewBlogForm = () => {
  const title = useField('text')
  const text = useField('text')
  const [image, setImage] = useState<Blob | null>(null)

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
      title: title.value,
      text: text.value,
    }
    console.log(newBlog)
    formData.append('title', title.value)
    formData.append('text', text.value)
    const blog = await blogRequest.add(formData)
    console.log(blog)
  }

  return (
    <form onSubmit={addBlog}>
      <h2>new blog</h2>
      <div>
        title
        <input {...title} />
      </div>
      <div>
        text
        <input {...text} />
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
