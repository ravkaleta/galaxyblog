import express from 'express'
import 'express-async-errors'
import blogRouter from './routes/blogRouter'
import userRouter from './routes/userRouter'
import loginRouter from './routes/loginRouter'
import mongoose from 'mongoose'
import config from './utils/config'
import logger from './utils/logger'
import { errorHandler } from './middleware/errorHandler'

const app = express()

mongoose.set('strictQuery', false)

mongoose
  .connect(config.MONGODB_URI())
  .then(() => {
    logger.info('connected to mongodb')
  })
  .catch((error) => {
    logger.error('failed connecting to mongodb: ', error)
  })

app.use(express.json())

app.get('/')

app.use('/api/users', userRouter)

app.use('/api/login', loginRouter)

app.use('/api/images', express.static('uploads/images'))

app.use('/api/blogs', blogRouter)

app.use(errorHandler)

export default app
