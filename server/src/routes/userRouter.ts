/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import userService from '../services/userService'

const router = express.Router()

router.get('/', async (_req, res) => {
  const users = await userService.getAll()
  res.send(users)
})

router.get('/:id', async (req, res) => {
  const userId = req.params.id
  const withDetails = req.query.detailed === 'true'

  const user = await userService.getById(userId, withDetails)

  res.send(user)
})

router.post('/', async (req, res) => {
  const savedUser = await userService.add(req.body)

  res.status(201).json(savedUser)
})

export default router
