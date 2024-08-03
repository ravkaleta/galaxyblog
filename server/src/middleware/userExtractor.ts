import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../utils/config'
import User, { IUserDocument } from '../models/User'

export interface CustomRequest extends Request {
  token?: string
  user?: IUserDocument
}

export interface TokenData {
  id: string
  username: string
}

// export const tokenExtractor = (
//   req: CustomRequest,
//   _res: Response,
//   next: NextFunction
// ) => {
//   const authorization = req.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     req.token = authorization.replace('Bearer ', '')
//   }

//   next()
// }

export const userExtractor = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  }

  if (!req.token) {
    return res.status(401).send('Token required')
  }

  const tokenData = jwt.verify(req.token, config.TOKEN_SECRET()) as TokenData

  if (!tokenData.id) {
    return res.status(401).send('Invalid token')
  }

  const user = await User.findById(tokenData.id)

  if (!user) {
    return res.status(401).send('Malformatted token')
  }

  req.user = user

  next()
}
