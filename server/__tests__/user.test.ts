import app from '../src/app'
import supertest from 'supertest'
import User, { IUserLogin, IUserRegister } from '../src/models/User'
import testUtils from './testUtils'
import mongoose from 'mongoose'
const api = supertest(app)

describe('addition of user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const user = new User({
      email: 'user@mail.com',
      username: 'user',
      password: 'userPassword',
      repeatPassword: 'userPassword',
    })

    await user.save()
  })

  test('succeeds with fresh username and email and both passwords matching', async () => {
    const usersAtStart = await testUtils.usersInDb()

    const userData: IUserRegister = {
      email: 'test@mail.com',
      username: 'testUser',
      password: 'testPassword',
      repeatPassword: 'testPassword',
    }

    await api
      .post('/api/users')
      .send(userData)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testUtils.usersInDb()
    expect(usersAtEnd.length).toStrictEqual(usersAtStart.length + 1)

    expect(usersAtEnd.some((u) => u.username === userData.username)).toBe(true)
  })

  test("fails when passwords doesn't match", async () => {
    const usersAtStart = await testUtils.usersInDb()

    const userData: IUserRegister = {
      email: 'test@mail.com',
      username: 'testUser',
      password: 'testPassword',
      repeatPassword: 'differentPassword',
    }

    await api.post('/api/users').send(userData).expect(400)

    const usersAtEnd = await testUtils.usersInDb()
    expect(usersAtEnd.length).toStrictEqual(usersAtStart.length)
    expect(usersAtEnd.some((u) => u.username === userData.username)).toBe(false)
  })

  test('fails when email is already taken', async () => {
    const usersAtStart = await testUtils.usersInDb()

    const userData: IUserRegister = {
      email: 'user@mail.com',
      username: 'testUser',
      password: 'testPassword',
      repeatPassword: 'testPassword',
    }

    await api.post('/api/users').send(userData).expect(400)

    const usersAtEnd = await testUtils.usersInDb()
    expect(usersAtEnd.length).toStrictEqual(usersAtStart.length)
    expect(usersAtEnd.some((u) => u.username === userData.username)).toBe(false)
  })

  test('fails when username is already taken', async () => {
    const usersAtStart = await testUtils.usersInDb()

    const userData: IUserRegister = {
      email: 'test@mail.com',
      username: 'user',
      password: 'testPassword',
      repeatPassword: 'testPassword',
    }

    await api.post('/api/users').send(userData).expect(400)

    const usersAtEnd = await testUtils.usersInDb()
    expect(usersAtEnd.length).toStrictEqual(usersAtStart.length)
    expect(usersAtEnd.some((u) => u.email === userData.email)).toBe(false)
  })
})

describe('logging in', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    await api.post('/api/users').send(testUtils.initialUser)
  })

  test('succeeds with valid user data', async () => {
    const userLoginData: IUserLogin = {
      email: 'user@mail.com',
      password: 'userPassword',
    }

    await api
      .post('/api/login')
      .send(userLoginData)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body.token).toBeDefined()
      })
  })

  test('fails with invalid password', async () => {
    const userLoginData: IUserLogin = {
      email: 'user@mail.com',
      password: 'invalidPassword',
    }

    await api.post('/api/login').send(userLoginData).expect(401)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
