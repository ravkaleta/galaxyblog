/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import jwt from 'jsonwebtoken'
import userService from '../services/userService'
import config from '../utils/config'

const router = express.Router()

router.post('/', async (req, res) => {
  const userForToken = await userService.login(req.body)

  const token = jwt.sign(userForToken, config.TOKEN_SECRET())

  res
    .status(200)
    .send({ token, username: userForToken.username, id: userForToken.id })
})

export default router
