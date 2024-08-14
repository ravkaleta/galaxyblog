import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import commentRequest from '../requests/commentRequest'
import Comment from './Comment'
import { useNotification } from '../providers/useContexts'
import { AxiosError } from 'axios'

interface CommentListProps {
  blogId: string
}

const CommentList = ({ blogId }: CommentListProps) => {
  const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['comments', blogId],
    queryFn: () => commentRequest.getRelatedTo(blogId),
  })

  const { setTempNotification } = useNotification()

  const deleteCommentMutation = useMutation({
    mutationFn: (args: { blogId: string; commentId: string }) =>
      commentRequest.remove(args.blogId, args.commentId),
    onSuccess: () => {
      console.log('removed comment')
      queryClient.invalidateQueries({ queryKey: ['comments'] })
      setTempNotification('success', 'Succesfully deleted comment!', 5)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setTempNotification('error', error.response?.data, 5)
      } else {
        console.error(error)
        setTempNotification('error', error.message, 5)
      }
    },
  })

  if (result.isLoading) {
    return null
  }

  const handleBlogDelete = (blogId: string, commentId: string) => {
    deleteCommentMutation.mutate({ blogId, commentId })
  }

  const comments = result.data

  return (
    <div className='mx-2'>
      {comments ? (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            handleBlogDelete={handleBlogDelete}
          />
        ))
      ) : (
        <p>No comments</p>
      )}
    </div>
  )
}

export default CommentList
