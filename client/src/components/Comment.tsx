import { Comment as IComment } from '../types'

interface CommentProps {
  comment: IComment
  handleBlogDelete: (blogId: string, commentId: string) => void
}

const Comment = ({ comment, handleBlogDelete }: CommentProps) => {
  return (
    <div>
      <h3>
        {comment.authorName} {comment.date}
        <button onClick={() => handleBlogDelete(comment.blogId, comment.id)}>
          delete
        </button>
      </h3>
      <p>{comment.content}</p>
    </div>
  )
}

export default Comment
