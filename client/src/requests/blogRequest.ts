import axios from 'axios'
import { Blog } from '../types'

const url = '/api/blogs'

const getAll = () => axios.get<Blog[]>(url).then((res) => res.data)

const add = (obj: FormData) =>
  axios.post<Blog>(url, obj).then((res) => res.data)

const remove = (objId: string) =>
  axios.delete(`${url}/${objId}`).then((res) => res.data)

export default { getAll, add, remove }
