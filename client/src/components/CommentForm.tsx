import { SyntheticEvent, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import commentRequest from '../requests/commentRequest'
import { Comment, NewComment } from '../types'
import { AxiosError } from 'axios'
import { useNotification } from '../providers/useContexts'
import { ArrowRight } from 'react-feather'
import useAutosizeTextArea from '../hooks/useAutosizeTextArea'

interface CommentFormProps {
  blogId: string
}

const CommentForm = ({ blogId }: CommentFormProps) => {
  const [commentContent, setCommentContent] = useState('')
  const queryClient = useQueryClient()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useAutosizeTextArea(textAreaRef.current!, commentContent)

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
    <form
      onSubmit={addComment}
      className='w-full flex border-b my-4 border-gray-500 bg-white/5'
    >
      <textarea
        value={commentContent}
        placeholder='Add comment'
        onChange={(event) => setCommentContent(event.target.value)}
        ref={textAreaRef}
        rows={1}
        className={`resize-none bg-transparent w-11/12 outline-none p-8 text-white`}
      />
      <button
        type='submit'
        className={`p-2 text-white ${commentContent ? 'rightAndBack' : 'text-gray-500'}`}
        disabled={!commentContent ? true : false}
      >
        <ArrowRight />
      </button>
    </form>
  )
}

export default CommentForm
