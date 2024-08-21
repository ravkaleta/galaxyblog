import mongoose from 'mongoose'
import { toJSONTransformId } from '../utils/transform'

export interface IComment {
  content: string
  date: string
  blogId: mongoose.ObjectId | string
  authorName: string
  authorId: mongoose.ObjectId | string
}

export type INewComment = Pick<IComment, 'content'>

export interface ICommentDocument extends IComment, mongoose.Document {}

const schema = new mongoose.Schema<ICommentDocument>({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  blogId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Blog',
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  authorId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
})

schema.set('toJSON', {
  transform: toJSONTransformId,
})

export default mongoose.model('Comment', schema)
