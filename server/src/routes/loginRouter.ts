/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { toUserLogin } from '../utils/parsers/userLoginParser'
import userService from '../services/userService'
import config from '../utils/config'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const userLoginData = toUserLogin(req.body)

    const user = await userService.getByEmail(userLoginData.email)

    if (!user) {
      throw new Error('Invalid username or password')
    }
    const passwordCorrect = await bcrypt.compare(
      userLoginData.password,
      user.password
    )

    if (!passwordCorrect) {
      throw new Error('Invalid username or password')
    }

    const userForToken = {
      id: user._id,
      username: user.username,
    }

    const token = jwt.sign(userForToken, config.TOKEN_SECRET())

    res.status(200).send({ token, username: user.username, id: user._id })
  } catch (error) {
    let errorMessage = ''
    if (error instanceof Error) {
      errorMessage += error.message
    } else {
      errorMessage += 'Something went wrong.'
    }
    res.status(401).send(errorMessage)
  }
})

export default router
