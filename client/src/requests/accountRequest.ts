import axios from 'axios'
import { LoginData, RegisterData } from '../types'
import { IUser } from '../providers/UserProvider'

const register = (data: RegisterData) => axios.post('/api/users', data)

const login = (data: LoginData) => axios.post<IUser>('/api/login', data)

export default { register, login }
