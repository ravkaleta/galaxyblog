import { SyntheticEvent, useState } from 'react'
import { Blog as IBlog } from '../types'
import { IUserType } from '../providers/UserProvider'
import BlogForm from './BlogForm'

interface BlogProps {
  blog: IBlog
  user: IUserType
  handleBlogDelete: (blogId: string) => void
}

const Blog = ({ blog, user, handleBlogDelete }: BlogProps) => {
  const [comment, setComment] = useState('')
  const [editMode, setEditMode] = useState(false)

  const addComment = (event: SyntheticEvent) => {
    event.preventDefault()
    const newComment = {
      blogId: blog.id,
      comment,
    }
    console.log(newComment)
  }

  return (
    <div style={{ backgroundColor: 'gray', margin: '10px' }}>
      {user && user.id === blog.authorId && (
        <div>
          <button onClick={() => handleBlogDelete(blog.id)}>delete blog</button>
          <button onClick={() => setEditMode((prev) => !prev)}>edit</button>
        </div>
      )}
      {editMode && (
        <BlogForm
          prevTitle={blog.title}
          prevText={blog.text}
          editMode={true}
          blogId={blog.id}
        />
      )}
      <p>
        {blog.title} {blog.date}
      </p>
      <p>author: {blog.authorName}</p>
      {blog.text}
      {blog.imageUrl && (
        <img src={`/api/images/${blog.imageUrl}`} width={'500px'} />
      )}
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
