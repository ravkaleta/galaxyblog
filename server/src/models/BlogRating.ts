import mongoose from 'mongoose'
import { toJSONTransformId } from '../utils/transform'

export enum IRatingValue {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}

export interface IBlogRating {
  value: IRatingValue
  authorId: mongoose.ObjectId | string
  blogId: mongoose.ObjectId | string
}

export type INewBlogRating = Pick<IBlogRating, 'value'>

export interface IBlogRatingDocument extends IBlogRating, mongoose.Document {}

const schema = new mongoose.Schema<IBlogRatingDocument>({
  value: {
    type: Number,
    enum: Object.values(IRatingValue).filter((v) => typeof v === 'number'),
    required: true,
  },
  authorId: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  blogId: {
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'Blog',
  },
})

schema.set('toJSON', { transform: toJSONTransformId })

export default mongoose.model('BlogRating', schema)
