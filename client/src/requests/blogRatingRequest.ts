import axios from 'axios'
import { BlogRating } from '../types'
import requestConfig from './requestConfig'

const baseUrl = '/api/blogs'

const getUserRating = (blogId: string) =>
  axios
    .get<BlogRating>(
      `${baseUrl}/${blogId}/ratings/user`,
      requestConfig.getConfig()
    )
    .then((res) => res.data)

const add = (blogId: string, value: number) =>
  axios
    .post<BlogRating>(
      `${baseUrl}/${blogId}/ratings`,
      { value },
      requestConfig.getConfig()
    )
    .then((res) => res.data)

const update = (blogId: string, ratingId: string, value: number) =>
  axios
    .put<BlogRating>(
      `${baseUrl}/${blogId}/ratings/${ratingId}`,
      { value },
      requestConfig.getConfig()
    )
    .then((res) => res.data)

const remove = (blogId: string, ratingId: string) =>
  axios.delete(
    `${baseUrl}/${blogId}/ratings/${ratingId}`,
    requestConfig.getConfig()
  )

export default { getUserRating, add, update, remove }
