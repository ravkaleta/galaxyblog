/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import userService from '../services/userService'
import bcrypt from 'bcrypt'
import { toNewUser } from '../utils/parsers/userParser'

const router = express.Router()

router.get('/', async (_req, res) => {
  const users = await userService.getAll()
  res.send(users)
})

router.post('/', async (req, res) => {
  try {
    const parsedUser = toNewUser(req.body)

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(parsedUser.password, saltRounds)

    const savedUser = await userService.add({
      ...parsedUser,
      password: passwordHash,
    })

    res.status(201).json(savedUser)
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
