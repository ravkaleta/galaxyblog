import mongoose from 'mongoose'
import { toJSONTransformId } from '../utils/transform'

export interface IBlog {
  title: string
  text: string
  imageUrl?: string
}

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
})

schema.set('toJSON', {
  transform: toJSONTransformId,
})

export default mongoose.model('Blog', schema)
