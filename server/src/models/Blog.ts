import mongoose from 'mongoose'

export interface BlogInput {
  title: string
  text: string
  imageUrl?: string
}

export interface BlogDocument extends BlogInput, mongoose.Document {}

const schema = new mongoose.Schema<BlogDocument>({
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
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

export default mongoose.model('Blog', schema)
