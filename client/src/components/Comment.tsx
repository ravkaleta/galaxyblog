import { Comment as IComment } from '../types'
import * as Icon from 'react-feather'

interface CommentProps {
  comment: IComment
  handleBlogDelete: (blogId: string, commentId: string) => void
}

const Comment = ({ comment, handleBlogDelete }: CommentProps) => {
  return (
    <div className='bg-gradient-to-bl from-blue-500/5 border-b border-gray-700 p-2'>
      <div className='flex justify-between'>
        <p>
          {comment.authorName} {comment.date}
        </p>
        <button
          className='text-red-300 hover:text-red-500 transition-all duration-150 text-sm inline-flex items-center'
          onClick={() => handleBlogDelete(comment.blogId, comment.id)}
        >
          Delete
          <Icon.Trash size='16px' />
        </button>
      </div>
      <p>{comment.content}</p>
    </div>
  )
}

export default Comment
