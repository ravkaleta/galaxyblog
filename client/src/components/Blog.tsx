import { SyntheticEvent, useState } from 'react'
import { Blog as IBlog } from '../types'

interface BlogProps extends IBlog {
  handleBlogDelete: (blogId: string) => void
}

const Blog = ({ id, title, text, imageUrl, handleBlogDelete }: BlogProps) => {
  const [comment, setComment] = useState('')

  const addComment = (event: SyntheticEvent) => {
    event.preventDefault()
    const newComment = {
      blogId: id,
      comment,
    }
    console.log(newComment)
  }

  return (
    <div key={id}>
      <p>
        {title}
        <button onClick={() => handleBlogDelete(id)}>delete blog</button>
      </p>
      {text}
      {imageUrl && <img src={`/api/images/${imageUrl}`} width={'500px'} />}
      <form onSubmit={addComment}>
        <textarea
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default Blog
