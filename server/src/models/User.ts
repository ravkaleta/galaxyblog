import mongoose from 'mongoose'
import { toJSONTransformId } from '../utils/transform'

export interface IUser {
  email: string
  username: string
  password: string
  blogs: Array<mongoose.ObjectId>
  comments: Array<mongoose.ObjectId>
}

export type IUserLogin = Pick<IUser, 'email' | 'password'>

export interface IUserDocument extends IUser, mongoose.Document {}

const schema = new mongoose.Schema<IUserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Blog',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },
  ],
})

schema.set('toJSON', {
  transform: toJSONTransformId,
})

export default mongoose.model('User', schema)
