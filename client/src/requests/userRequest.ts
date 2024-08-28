import axios from 'axios'
import { User } from '../types'

const url = '/api/users'

const getWithDetails = (id: string | undefined) =>
  axios.get<User>(`${url}/${id}?detailed=true`).then((res) => res.data)

export default { getWithDetails }
