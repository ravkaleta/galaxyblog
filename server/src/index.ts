import express from 'express'
import blogRouter from './routes/blogRouter'
import mongoose from 'mongoose'
import config from './utils/config'

const app = express()

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI())
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.log('failed connecting to mongodb: ', error)
  })

app.use(express.json())

app.get('/')

app.use('/api/images', express.static('uploads/images'))

app.use('/api/blogs', blogRouter)

app.listen(config.PORT, () => {
  console.log('Server is running on port ', config.PORT)
})
