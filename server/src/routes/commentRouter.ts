/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import commentService from '../services/commentService'
import { UserRequest, userExtractor } from '../middleware/userExtractor'
const router = express.Router({ mergeParams: true })

interface CommentRequest extends UserRequest {
  params: {
    blogId: string
    commentId?: string
  }
}

router.get('/', async (req: CommentRequest, res) => {
  const blogId = req.params.blogId
  const comments = await commentService.getRelated(blogId)
  res.send(comments)
})

router.post('/', userExtractor, async (req: CommentRequest, res) => {
  if (!req.user) {
    throw new Error('You must log in to add comments')
  }

  const savedComment = await commentService.add(
    req.user,
    req.params.blogId,
    req.body
  )

  res.send(savedComment)
})

router.delete(
  '/:commentId',
  userExtractor,
  async (req: CommentRequest, res) => {
    if (!req.user) {
      throw new Error('You must log in to delete your comments')
    }

    if (!req.params.commentId) {
      throw new Error('Comment id required')
    }

    await commentService.remove(
      req.user,
      req.params.blogId,
      req.params.commentId
    )

    res.status(200).end()
  }
)

export default router
