import mongoose from 'mongoose'
import Blog, { IBlogDocument, IBlog } from '../models/Blog'
import User, { IUserDocument } from '../models/User'
import { toNewBlog } from '../utils/parsers/blogParser'
import fs from 'fs'
import Comment from '../models/Comment'

const getAll = async (): Promise<IBlogDocument[]> => {
  const blogs = await Blog.find({}).sort({ date: -1 })
  return blogs
}

const getById = async (id: string): Promise<IBlogDocument> => {
  const blog = await Blog.findById(id)

  if (!blog) {
    throw new Error("There's no blog with that id")
  }
  return blog
}

const add = async (
  user: IUserDocument,
  blogObject: unknown,
  file: Express.Multer.File | undefined
): Promise<IBlogDocument> => {
  const parsedBlog = toNewBlog(blogObject)

  const blogToAdd: IBlog = {
    ...parsedBlog,
    authorId: user._id as mongoose.ObjectId,
    authorName: user.username,
    date: new Date().toISOString(),
    comments: [],
    ratings: [],
    avgRating: 0,
    totalRatings: 0,
  }

  if (file) {
    blogToAdd.imageUrl = file.filename
  }

  const newBlog = new Blog({
    ...blogToAdd,
  })
  const addedBlog = await newBlog.save()

  user.blogs.push(addedBlog._id as mongoose.ObjectId)
  await user.save()

  return addedBlog
}

const remove = async (user: IUserDocument, blogId: string) => {
  const blog = await getById(blogId)

  if (user.id !== blog.authorId.toString()) {
    throw new Error('User can delete only his own blogs')
  }

  if (blog.imageUrl) {
    fs.unlinkSync(`uploads/images/${blog.imageUrl}`)
  }

  await blog.deleteOne()

  user.blogs = user.blogs.filter((id) => id.toString() !== blogId)
  await user.save()

  await Comment.deleteMany({ blogId: blog._id })
  await User.updateMany(
    {
      comments: { $in: blog.comments },
      blogRatings: { $in: blog.ratings },
    },
    {
      $pull: {
        comments: { $in: blog.comments },
        blogRatings: { $in: blog.ratings },
      },
    }
  )
}

const update = async (
  user: IUserDocument,
  blogId: string,
  blogObject: unknown,
  file: Express.Multer.File | undefined
): Promise<IBlogDocument> => {
  const blog = await getById(blogId)

  if (user.id !== blog.authorId.toString()) {
    throw new Error('User can edit only his own blogs')
  }

  const blogUpdate = toNewBlog(blogObject)

  if (file) {
    blogUpdate.imageUrl = file.filename
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogUpdate, {
    new: true,
  })

  if (!updatedBlog) {
    throw new Error('Invalid blog id')
  }

  if (file && blog.imageUrl) {
    fs.unlinkSync(`uploads/images/${blog.imageUrl}`)
  }

  return updatedBlog
}

export default { getAll, add, remove, update, getById }
