import { INewBlogRating } from '../../models/BlogRating'
import { isRatingValue } from '../typeCheck'

const toNewRating = (obj: unknown): INewBlogRating => {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if (!('value' in obj)) {
    throw new Error('Missing rating value')
  }

  if (!isRatingValue(obj.value)) {
    throw new Error('Incorrect rating value')
  }

  return {
    value: obj.value,
  }
}

export default toNewRating
