import axios from 'axios'
import { Blog } from '../types'
import requestConfig from './requestConfig'

const url = '/api/blogs'

const getAll = (limit: number) =>
  axios.get<Blog[]>(`${url}?limit=${limit.toString()}`).then((res) => res.data)

const getSearched = (searchTerm: string, limit: number) =>
  axios
    .get<Blog[]>(`${url}?searchTerm=${searchTerm}&limit=${limit.toString()}`)
    .then((res) => res.data)

const getTop = (limit: number) =>
  axios
    .get<Blog[]>(`${url}?sort=top&limit=${limit.toString()}`)
    .then((res) => res.data)

const getNew = (limit: number) =>
  axios
    .get<Blog[]>(`${url}?sort=new&limit=${limit.toString()}`)
    .then((res) => res.data)

const getById = (id: string | undefined) =>
  axios.get<Blog>(`${url}/${id}`).then((res) => res.data)

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

export default {
  getAll,
  getSearched,
  getTop,
  getNew,
  getById,
  add,
  remove,
  update,
}
