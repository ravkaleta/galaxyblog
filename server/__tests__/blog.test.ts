import app from '../src/app'
import supertest from 'supertest'
import testUtils from './testUtils'
import Blog, { IBlog, INewBlog } from '../src/models/Blog'
import User from '../src/models/User'
const api = supertest(app)

const user = {
  token: 'Bearer ',
  username: '',
  id: '',
}

describe('When there are some blogs initially in the data base', () => {
  beforeAll(async () => {
    await User.deleteMany({})

    const initialUser = testUtils.initialUser
    await api.post('/api/users').send(initialUser)

    const response = await api
      .post('/api/login')
      .send({ email: initialUser.email, password: initialUser.password })

    user.token = user.token + response.body.token
    user.username = response.body.username as string
    user.id = response.body.id as string
  })

  beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of testUtils.inititalBlogs) {
      const blogObject = new Blog({ ...blog, authorId: user.id })
      await blogObject.save()
    }
  })

  test('blogs are returned in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are in the response', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = response.body as IBlog[]

    expect(blogs.length).toStrictEqual(testUtils.inititalBlogs.length)
  })

  test('one of the blog is found in the response', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = response.body as IBlog[]

    const blogExist = blogs.some(
      (b) => b.title === testUtils.inititalBlogs[1].title
    )
    expect(blogExist).toBe(true)
  })

  describe('addition of new blog', () => {
    test('succeeds with valid data adn valid token', async () => {
      const newBlog: INewBlog = {
        title: 'testTitle',
        text: 'test text',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', user.token)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await Blog.find({})
      expect(blogsAtEnd.length).toStrictEqual(
        testUtils.inititalBlogs.length + 1
      )

      expect(blogsAtEnd.find((b) => b.title === newBlog.title)).toBeDefined()
    })

    test('fails with missing text', async () => {
      const newBlog = {
        title: 'testTitle',
      }

      await api
        .post('/api/blogs')
        .set('Authorization', user.token)
        .send(newBlog)
        .expect(400)
    })

    test('fails with not authorized user', async () => {
      const newBlog: INewBlog = {
        title: 'testTitle',
        text: 'test text',
      }

      await api.post('/api/blogs').send(newBlog).expect(401)
    })
  })
})
