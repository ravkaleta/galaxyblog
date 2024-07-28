import { IBlog } from '../../models/Blog'
import { parseString } from './utilParsers'

export const toNewBlog = (obj: unknown): IBlog => {
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
