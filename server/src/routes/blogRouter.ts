/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import blogService from '../services/blogService'
import { toNewBlog } from '../utils/blogParser'
import config from '../utils/config'

const router = express.Router()

router.get('/', async (_req, res) => {
  const blogs = await blogService.getAll()
  console.log(blogs)
  res.send(blogs)
})

router.post('/', config.upload.single('image'), async (req, res) => {
  try {
    const parsedBlog = toNewBlog(req.body)

    if (req.file) {
      parsedBlog.imageUrl = req.file.filename
    }

    const addedBlog = await blogService.add(parsedBlog)

    res.send(addedBlog)
  } catch (error) {
    let errorMessage = 'Something went wrong. '
    if (error instanceof Error) {
      errorMessage += error.message
    }

    res.status(400).send(errorMessage)
  }
})

export default router
