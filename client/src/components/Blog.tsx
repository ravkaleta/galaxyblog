import { useState } from 'react'
import { Blog as IBlog } from '../types'
import { IUserType } from '../providers/UserProvider'
import BlogForm from './BlogForm'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

interface BlogProps {
  blog: IBlog
  user: IUserType
  handleBlogDelete: (blogId: string) => void
}

const Blog = ({ blog, user, handleBlogDelete }: BlogProps) => {
  const [editMode, setEditMode] = useState(false)

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
      <CommentList blogId={blog.id} />
      <CommentForm blogId={blog.id} />
    </div>
  )
}

export default Blog
