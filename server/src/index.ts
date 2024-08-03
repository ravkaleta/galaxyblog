import express from 'express'
import blogRouter from './routes/blogRouter'
import userRouter from './routes/userRouter'
import loginRouter from './routes/loginRouter'
import mongoose from 'mongoose'
import config from './utils/config'
// import { tokenExtractor } from './middleware/userExtractor'

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
// app.use(tokenExtractor)

app.get('/')

app.use('/api/users', userRouter)

app.use('/api/login', loginRouter)

app.use('/api/images', express.static('uploads/images'))

app.use('/api/blogs', blogRouter)

app.listen(config.PORT, () => {
  console.log('Server is running on port ', config.PORT)
})
