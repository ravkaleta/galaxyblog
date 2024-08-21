/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import blogService from '../services/blogService'
import config from '../utils/config'
import { UserRequest, userExtractor } from '../middleware/userExtractor'
import commentRouter from './commentRouter'
import blogRatingRouter from './blogRatingRouter'

const router = express.Router()

router.get('/', async (_req, res) => {
  const blogs = await blogService.getAll()
  res.send(blogs)
})

router.get('/:id', async (req, res) => {
  const blogId = req.params.id
  const blog = await blogService.getById(blogId)
  res.send(blog)
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

    res.status(201).send(addedBlog)
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
router.use('/:blogId/ratings', blogRatingRouter)

export default router
