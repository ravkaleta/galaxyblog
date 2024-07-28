import mongoose from 'mongoose'
import { toJSONTransformId } from '../utils/transform'

export interface IUser {
  email: string
  username: string
  password: string
}

export type IUserLogin = Omit<IUser, 'username'>

export interface IUserDocument extends IUser, mongoose.Document {}

const schema = new mongoose.Schema<IUserDocument>({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

schema.set('toJSON', {
  transform: toJSONTransformId,
})

export default mongoose.model('User', schema)
