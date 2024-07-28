import { IUserLogin } from '../../models/User'
import { parseString } from './utilParsers'

export const toUserLogin = (obj: unknown): IUserLogin => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (!('email' in obj)) {
    throw new Error('Missing email')
  }

  if (!('password' in obj)) {
    throw new Error('Missing password')
  }

  return {
    email: parseString(obj.email, 'email'),
    password: parseString(obj.password, 'password'),
  }
}
