import mongoose from 'mongoose'
import { IRatingValue } from '../models/BlogRating'

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

export const isObjectId = (id: unknown): id is mongoose.ObjectId => {
  return mongoose.isValidObjectId(id)
}

export const isRatingValue = (value: unknown): value is IRatingValue => {
  return (
    typeof value === 'number' && Object.values(IRatingValue).includes(value)
  )
}
