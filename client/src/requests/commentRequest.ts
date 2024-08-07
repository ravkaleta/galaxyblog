import axios from 'axios'
import { Comment, NewComment } from '../types'
import requestConfig from './requestConfig'

const url = '/api/blogs'

const getRelatedTo = async (blogId: string) =>
  axios.get<Comment[]>(`${url}/${blogId}/comments`).then((res) => res.data)

const add = async (blogId: string, comment: NewComment) =>
  axios
    .post<Comment>(
      `${url}/${blogId}/comments`,
      comment,
      requestConfig.getConfig()
    )
    .then((res) => res.data)

const remove = async (blogId: string, commentId: string) =>
  axios
    .delete(`${url}/${blogId}/comments/${commentId}`, requestConfig.getConfig())
    .then((res) => res.data)

export default { getRelatedTo, add, remove }
