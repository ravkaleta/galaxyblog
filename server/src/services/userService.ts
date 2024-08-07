import User from '../models/User'
import bcrypt from 'bcrypt'
import { toNewUser } from '../utils/parsers/userParser'
import { toUserLogin } from '../utils/parsers/userLoginParser'

const getAll = async () => {
  return await User.find({})
}

const getById = async (id: string) => {
  return await User.findById(id)
}

const getByUsername = async (username: string) => {
  return await User.findOne({ username })
}

const getByEmail = async (email: string) => {
  return await User.findOne({ email })
}

const add = async (body: unknown) => {
  const parsedUser = toNewUser(body)

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(parsedUser.password, saltRounds)
  const newUser = new User({ ...parsedUser, password: passwordHash })

  return await newUser.save()
}

const login = async (body: unknown) => {
  const userLoginData = toUserLogin(body)

  const user = await getByEmail(userLoginData.email)

  if (!user) {
    throw new Error('Invalid username or password')
  }
  const passwordCorrect = await bcrypt.compare(
    userLoginData.password,
    user.password
  )

  if (!passwordCorrect) {
    throw new Error('Invalid username or password')
  }

  return {
    id: user._id,
    username: user.username,
  }
}

export default { getAll, getByUsername, getById, getByEmail, add, login }
