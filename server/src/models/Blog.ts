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
  ratings: Array<mongoose.ObjectId>
  avgRating: number
  totalRatings: number
}

export type INewBlog = Pick<IBlog, 'title' | 'text' | 'imageUrl'>

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
  ratings: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'BlogRating',
    },
  ],
  avgRating: {
    required: true,
    type: Number,
  },
  totalRatings: {
    required: true,
    type: Number,
  },
})

schema.set('toJSON', {
  transform: toJSONTransformId,
})

export default mongoose.model('Blog', schema)
