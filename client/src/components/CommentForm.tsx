import { SyntheticEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import commentRequest from '../requests/commentRequest'
import { Comment, NewComment } from '../types'
import { AxiosError } from 'axios'
import { useNotification } from '../providers/useContexts'
import { ArrowRight } from 'react-feather'

interface CommentFormProps {
  blogId: string
}

const CommentForm = ({ blogId }: CommentFormProps) => {
  const [commentContent, setCommentContent] = useState('')
  const [isFocused, setFocused] = useState(false)
  const queryClient = useQueryClient()

  const { setTempNotification } = useNotification()

  const addCommentMutation = useMutation({
    mutationFn: (args: { blogId: string; comment: NewComment }) =>
      commentRequest.add(args.blogId, args.comment),
    onSuccess: (newComment) => {
      const comments = queryClient.getQueryData<Comment[]>(['comments', blogId])
      queryClient.setQueryData(
        ['comments', blogId],
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
      content: commentContent,
    }

    addCommentMutation.mutate({ blogId, comment })

    setCommentContent('')
  }

  return (
    <form onSubmit={addComment} className='flex mx-2 border-b border-gray-500'>
      <textarea
        value={commentContent}
        placeholder='Add comment'
        onChange={(event) => setCommentContent(event.target.value)}
        className={`resize-none bg-transparent w-11/12 transition-all ${isFocused ? 'h-26 overflow-visible' : 'h-10 overflow-hidden'} outline-none p-2`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <button
        type='submit'
        className={`p-2 ${commentContent ? 'rightAndBack' : 'text-gray-500'}`}
        disabled={!commentContent ? true : false}
      >
        <ArrowRight />
      </button>
    </form>
  )
}

export default CommentForm
