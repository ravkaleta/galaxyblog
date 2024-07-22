import { SyntheticEvent, useState } from 'react'
import { Blog as BlogProps } from '../types'

const Blog = ({ id, title, text, imageUrl }: BlogProps) => {
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
      <p>{title}</p>
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
