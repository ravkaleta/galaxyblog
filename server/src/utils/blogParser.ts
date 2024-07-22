import { BlogInput } from '../models/Blog'
import { isString } from './typeCheck'

export const toNewBlog = (obj: unknown): BlogInput => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (!('title' in obj)) {
    throw new Error('Missing title for blog')
  }

  if (!('text' in obj)) {
    throw new Error('Missing text for blog')
  }

  return {
    title: parseString(obj.title, `title`),
    text: parseString(obj.text, 'text'),
  }
}

const parseString = (str: unknown, varName: string): string => {
  if (!isString(str)) {
    throw new Error(`Incorrect ${varName}: ` + str)
  }
  return str
}
