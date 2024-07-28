import User, { IUser } from '../models/User'

const getAll = async () => {
  return await User.find({})
}

const getByUsername = async (username: string) => {
  return await User.findOne({ username })
}

const getByEmail = async (email: string) => {
  return await User.findOne({ email })
}

const add = async (obj: IUser) => {
  const newUser = new User({ ...obj })

  return await newUser.save()
}

export default { getAll, getByUsername, getByEmail, add }
