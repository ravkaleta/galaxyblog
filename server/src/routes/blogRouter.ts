/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import blogService from '../services/blogService'
import { toNewBlog } from '../utils/parsers/blogParser'
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
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage += error.message
    } else {
      errorMessage += 'Something went wrong.'
    }

    res.status(400).send(errorMessage)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const blogId = req.params.id
    await blogService.remove(blogId)
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

router.put('/:id', async (req, res) => {
  try {
    const blogId = req.params.id
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
})

export default router
