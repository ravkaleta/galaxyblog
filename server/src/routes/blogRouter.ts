/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import blogService from '../services/blogService'
import { toNewBlog } from '../utils/parsers/blogParser'
import config from '../utils/config'
import { CustomRequest, userExtractor } from '../middleware/userExtractor'
import { IBlog } from '../models/Blog'
import mongoose from 'mongoose'
import fs from 'fs'
import { isObjectId } from '../utils/typeCheck'
import commentRouter from './commentRouter'

const router = express.Router()

router.get('/', async (_req, res) => {
  const blogs = await blogService.getAll()
  res.send(blogs)
})

router.post(
  '/',
  config.upload.single('image'),
  userExtractor,
  async (req: CustomRequest, res) => {
    try {
      if (!req.user) {
        throw new Error('You must log in to add new blog')
      }
      const user = req.user
      // const file = req.file
      const parsedBlog = toNewBlog(req.body)

      const blogToAdd: IBlog = {
        ...parsedBlog,
        authorId: user._id as mongoose.ObjectId,
        authorName: user.username,
        date: new Date().toISOString(),
      }

      if (req.file) {
        blogToAdd.imageUrl = req.file.filename
      }

      const addedBlog = await blogService.add(blogToAdd)
      user.blogs.push(addedBlog._id as mongoose.ObjectId)
      await user.save()

      res.send(addedBlog)
    } catch (error) {
      let errorMessage = ''
      if (error instanceof Error) {
        errorMessage += error.message
      } else {
        errorMessage += 'Something went wrong.'
      }

      res.status(400).send(errorMessage)
    }
  }
)

router.delete('/:id', userExtractor, async (req: CustomRequest, res) => {
  try {
    const blogId = req.params.id
    const blog = await blogService.getById(blogId)

    if (
      !req.user ||
      !isObjectId(req.user._id) ||
      req.user._id.toString() !== blog.authorId.toString()
    ) {
      throw new Error('User can delete only his own blogs')
    }
    const user = req.user

    if (blog.imageUrl) {
      fs.unlinkSync(`uploads/images/${blog.imageUrl}`)
    }

    await blogService.remove(blogId)
    user.blogs = user.blogs.filter((id) => id.toString() !== blogId)
    await user.save()

    res.status(204).end()
  } catch (error) {
    let errorMessage = ''
    if (error instanceof Error) {
      if (error.name === 'CastError') {
        errorMessage += 'Malformatted id'
      } else {
        errorMessage += error.message
      }
    } else {
      errorMessage += 'Something went wrong'
    }

    res.status(400).send(errorMessage)
  }
})

router.put(
  '/:id',
  config.upload.single('image'),
  userExtractor,
  async (req: CustomRequest, res) => {
    try {
      const blogId = req.params.id
      console.log(req.body)

      const blog = await blogService.getById(blogId)

      if (
        !req.user ||
        !isObjectId(req.user._id) ||
        req.user._id.toString() !== blog.authorId.toString()
      ) {
        throw new Error('User can edit only his own blogs')
      }

      const blogUpdate = toNewBlog(req.body)

      const updatedBlog = await blogService.update(blogId, blogUpdate)

      res.status(200).send(updatedBlog)
    } catch (error) {
      let errorMessage = ''
      if (error instanceof Error) {
        if (error.name === 'CastError') {
          errorMessage += 'Malformatted id'
        } else {
          errorMessage += error.message
        }
      } else {
        errorMessage += 'Something went wrong'
      }

      res.status(400).send(errorMessage)
    }
  }
)

router.use('/:blogId/comments', commentRouter)

export default router
