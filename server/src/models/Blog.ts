import mongoose from 'mongoose'
import { toJSONTransformId } from '../utils/transform'

export interface IBlog {
  title: string
  text: string
  imageUrl?: string
  authorId: mongoose.ObjectId | string
  authorName: string
  date: string
  comments: Array<mongoose.ObjectId>
}

export type INewBlog = Omit<IBlog, 'authorId' | 'authorName' | 'date'>

export interface IBlogDocument extends IBlog, mongoose.Document {}

const schema = new mongoose.Schema<IBlogDocument>({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  authorId: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  authorName: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
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

export default mongoose.model('Blog', schema)
