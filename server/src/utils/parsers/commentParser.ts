import { INewComment } from '../../models/Comment'
import { parseString } from './utilParsers'

export const toNewComment = (obj: unknown): INewComment => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (!('content' in obj)) {
    throw new Error('Missing content for comment')
  }

  return {
    content: parseString(obj.content, 'content'),
  }
}
