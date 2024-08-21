/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UserRequest } from '../middleware/userExtractor'
import blogRatingService from '../services/blogRatingService'
import { userExtractor } from '../middleware/userExtractor'

const router = Router({ mergeParams: true })

interface BlogRatingRequest extends UserRequest {
  params: {
    blogId: string
    blogRatingId?: string
  }
}

router.get('/', async (req: BlogRatingRequest, res) => {
  const blogId = req.params.blogId
  const ratings = await blogRatingService.getAll(blogId)
  res.send(ratings)
})

router.get('/user', userExtractor, async (req: BlogRatingRequest, res) => {
  if (!req.user) {
    return res.send({})
  }

  const blogId = req.params.blogId
  const rating = await blogRatingService.getUserRating(req.user, blogId)
  res.send(rating)
})

router.post('/', userExtractor, async (req: BlogRatingRequest, res) => {
  if (!req.user) {
    throw new Error('You must log in to add ratings')
  }

  console.log(req.body)

  const blogId = req.params.blogId
  console.log(blogId)
  const savedRating = await blogRatingService.add(req.user, blogId, req.body)

  res.status(201).send(savedRating)
})

router.put(
  '/:blogRatingId',
  userExtractor,
  async (req: BlogRatingRequest, res) => {
    if (!req.user) {
      throw new Error('You must log in to update ratings')
    }

    if (!req.params.blogRatingId) {
      throw new Error('Rating id required')
    }

    const updatedRating = await blogRatingService.update(
      req.user,
      req.params.blogId,
      req.params.blogRatingId,
      req.body
    )

    res.status(200).send(updatedRating)
  }
)

router.delete(
  '/:blogRatingId',
  userExtractor,
  async (req: BlogRatingRequest, res) => {
    if (!req.user) {
      throw new Error('You must log in to update ratings')
    }

    if (!req.params.blogRatingId) {
      throw new Error('Rating id required')
    }

    const blogId = req.params.blogId
    await blogRatingService.remove(req.user, blogId, req.params.blogRatingId)

    res.status(200).end()
  }
)

export default router
