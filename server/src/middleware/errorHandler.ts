import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === 'CastError') {
    return res.status(400).send('Malformatted id')
  }
  if (error.name === 'ValidationError') {
    return res.status(400).send(error.message)
  }
  if (
    error.name === 'MongoServerError' &&
    error.message.includes('E11000 duplicate key error')
  ) {
    if (error.message.includes('email')) {
      return res.status(400).send('Email is already taken')
    }
    if (error.message.includes('username')) {
      return res.status(400).send('Username is already taken')
    }

    return res.status(400).send('Something gone wrong. Values are not unique')
  }
  if (error.message.includes('Invalid username or password')) {
    return res.status(401).send(error.message)
  }
  if (error.name === 'Error') {
    return res.status(400).send(error.message)
  }

  next(error)
}
