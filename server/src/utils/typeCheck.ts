import mongoose from 'mongoose'

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String
}

export const isObjectId = (id: unknown): id is mongoose.ObjectId => {
  return mongoose.isValidObjectId(id)
}
