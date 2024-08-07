import { SyntheticEvent } from 'react'
import useField from '../hooks/useField'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import commentRequest from '../requests/commentRequest'
import { Comment, NewComment } from '../types'
import { AxiosError } from 'axios'
import { useNotification } from '../providers/useContexts'

interface CommentFormProps {
  blogId: string
}

const CommentForm = ({ blogId }: CommentFormProps) => {
  const content = useField('text')
  const queryClient = useQueryClient()

  const { setTempNotification } = useNotification()

  const addCommentMutation = useMutation({
    mutationFn: (args: { blogId: string; comment: NewComment }) =>
      commentRequest.add(args.blogId, args.comment),
    onSuccess: (newComment) => {
      const comments = queryClient.getQueryData<Comment[]>(['comments'])
      queryClient.setQueryData(
        ['comments'],
        comments ? comments.concat(newComment) : [newComment]
      )
      setTempNotification('success', 'Succesfully added new comment', 5)
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        setTempNotification('error', error.response?.data, 5)
      } else {
        setTempNotification('error', error.message, 5)
      }
    },
  })

  const addComment = (event: SyntheticEvent) => {
    event.preventDefault()

    const comment: NewComment = {
      content: content.input.value,
    }

    addCommentMutation.mutate({ blogId, comment })

    content.reset()
  }

  return (
    <form onSubmit={addComment}>
      <input {...content.input} />
      <button type='submit'>add comment</button>
    </form>
  )
}

export default CommentForm
