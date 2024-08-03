/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import commentService from '../services/commentService'
import { CustomRequest, userExtractor } from '../middleware/userExtractor'
import { toNewComment } from '../utils/parsers/commentParser'
import { IComment } from '../models/Comment'
import mongoose from 'mongoose'
const router = express.Router()

interface CommentRequest extends CustomRequest {
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
  try {
    if (!req.user) {
      throw new Error('You must log in to add comments')
    }
    const user = req.user
    const blogId = req.params.blogId
    const parsedComment = toNewComment(req.body)

    console.log(blogId, parsedComment)

    const newComment: IComment = {
      ...parsedComment,
      date: new Date().toISOString(),
      blogId: blogId,
      authorName: user.username,
      authorId: user._id as mongoose.ObjectId,
    }

    const addedComment = await commentService.add(newComment)
    user.comments.push(addedComment._id as mongoose.ObjectId)
    await user.save()
  } catch (error) {
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage += error.message
    } else {
      errorMessage += 'Something went wrong.'
    }

    res.status(400).send(errorMessage)
  }
})

export default router
