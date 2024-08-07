/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import blogService from '../services/blogService'
import config from '../utils/config'
import { UserRequest, userExtractor } from '../middleware/userExtractor'
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
  async (req: UserRequest, res) => {
    if (!req.user) {
      throw new Error('You must log in to delete your comments')
    }
    const addedBlog = await blogService.add(req.user, req.body, req.file)

    res.send(addedBlog)
  }
)

router.delete('/:id', userExtractor, async (req: UserRequest, res) => {
  if (!req.user) {
    throw new Error('You must log in to delete your comments')
  }
  await blogService.remove(req.user, req.params.id)

  res.status(204).end()
})

router.put(
  '/:id',
  config.upload.single('image'),
  userExtractor,
  async (req: UserRequest, res) => {
    if (!req.user) {
      throw new Error('You must log in to delete your comments')
    }
    const updatedBlog = await blogService.update(
      req.user,
      req.params.id,
      req.body,
      req.file
    )

    res.status(200).send(updatedBlog)
  }
)

router.use('/:blogId/comments', commentRouter)

export default router
