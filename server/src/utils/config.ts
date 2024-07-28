import dotenv from 'dotenv'
import multer from 'multer'
import path from 'path'
dotenv.config()

const PORT = 3000

const TOKEN_SECRET = (): string => {
  const TOKEN_SECRET = process.env.TOKEN_SECRET
  if (!TOKEN_SECRET || typeof TOKEN_SECRET !== 'string') {
    console.error('Missing token secret')
    throw new Error('Server error.')
  }
  return TOKEN_SECRET
}

const MONGODB_URI = (): string => {
  const MONGODB_URI = process.env.MONGODB_URI
  if (!MONGODB_URI || typeof MONGODB_URI !== 'string') {
    throw new Error('Incorrect or missing mongodb uri')
  }

  return MONGODB_URI
}

const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join('uploads/images'))
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  },
})

const upload = multer({
  storage: multerStorage,
  fileFilter: (_req, file, cb) => {
    const allowedFileType = ['jpg', 'jpeg', 'png']
    if (allowedFileType.includes(file.mimetype.split('/')[1])) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  },
})

export default { MONGODB_URI, PORT, TOKEN_SECRET, upload }
