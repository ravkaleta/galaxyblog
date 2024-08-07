import axios from 'axios'
import { Blog } from '../types'
import requestConfig from './requestConfig'

const url = '/api/blogs'

const getAll = () => axios.get<Blog[]>(url).then((res) => res.data)

const add = (obj: FormData) =>
  axios.post<Blog>(url, obj, requestConfig.getConfig()).then((res) => res.data)

const remove = (objId: string) =>
  axios
    .delete(`${url}/${objId}`, requestConfig.getConfig())
    .then((res) => res.data)

const update = (objId: string, obj: FormData) =>
  axios
    .put<Blog>(`${url}/${objId}`, obj, requestConfig.getConfig())
    .then((res) => res.data)

export default { getAll, add, remove, update }
