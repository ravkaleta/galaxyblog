import { IBlog } from '../src/models/Blog'
import User, { IUserRegister } from '../src/models/User'

const inititalBlogs: IBlog[] = [
  {
    title: 'FirstBlog',
    text: 'First blog text',
    authorName: 'First User',
    authorId: '',
    date: '2024-12-12',
  },
  {
    title: 'SecondBlog',
    text: 'Second blog text',
    authorName: 'Second User',
    authorId: '',
    date: '2020-06-06',
  },
  {
    title: 'ThirdBlog',
    text: 'Third blog text',
    authorName: 'First User',
    authorId: '',
    date: '2019-11-11',
  },
]

const initialUser: IUserRegister = {
  email: 'user@mail.com',
  username: 'user',
  password: 'userPassword',
  repeatPassword: 'userPassword',
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

export default { usersInDb, inititalBlogs, initialUser }
