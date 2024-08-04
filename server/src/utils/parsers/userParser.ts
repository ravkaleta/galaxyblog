import { IUser } from '../../models/User'
import { parseString } from './utilParsers'

export const toNewUser = (obj: unknown): IUser => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (!('email' in obj)) {
    throw new Error('Missing email')
  }

  if (!('username' in obj)) {
    throw new Error('Missing username')
  }

  if (!('password' in obj)) {
    throw new Error('Missing password')
  }

  if (!('repeatPassword' in obj)) {
    throw new Error('Missing password repeat')
  }

  if (obj.password !== obj.repeatPassword) {
    throw new Error("Password does't match with password repeat")
  }

  return {
    email: parseString(obj.email, `email`),
    username: parseString(obj.username, `username`),
    password: parseString(obj.password, 'password'),
    blogs: [],
    comments: [],
  }
}
