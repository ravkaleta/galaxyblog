import { Comment as IComment } from '../types'
import * as Icon from 'react-feather'

interface CommentProps {
  comment: IComment
  handleBlogDelete: (blogId: string, commentId: string) => void
}

const Comment = ({ comment, handleBlogDelete }: CommentProps) => {
  const commentDate = new Date(comment.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className='bg-black bg-opacity-50 text-white border-b border-x border-gray-700 p-2'>
      <div className='flex justify-between'>
        <p className='ml-4 mb-2'>
          {commentDate} by{' '}
          <span className='text-secondary-500'>{comment.authorName}</span>
        </p>
        <button
          className='text-red-300 hover:text-red-500 transition-all duration-150 text-sm inline-flex items-center'
          onClick={() => handleBlogDelete(comment.blogId, comment.id)}
        >
          Delete
          <Icon.Trash size='16px' />
        </button>
      </div>
      <p className='whitespace-pre-line'>{comment.content}</p>
    </div>
  )
}

export default Comment
