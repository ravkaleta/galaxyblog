import mongoose from 'mongoose'
import BlogRating, { IBlogRating } from '../models/BlogRating'
import { IUserDocument } from '../models/User'
import { isRatingValue } from '../utils/typeCheck'
import Blog from '../models/Blog'
import toNewRating from '../utils/parsers/blogRatingParser'

const getAll = async (blogId: string) => {
  return await BlogRating.find({ blogId })
}

const getById = async (ratingId: string) => {
  const rating = await BlogRating.findById(ratingId)

  if (!rating) {
    throw new Error("Couldn't find matching rating")
  }

  return rating
}

const getUserRating = async (user: IUserDocument, blogId: string) => {
  const rating = await BlogRating.findOne({
    blogId,
    authorId: user.id as string,
  })

  if (!rating) {
    return null
  }
  return rating
}

const add = async (user: IUserDocument, blogId: string, rating: unknown) => {
  const newRating = toNewRating(rating)

  const hasAlreadyRated = await getUserRating(user, blogId)
  console.log(hasAlreadyRated)

  if (hasAlreadyRated) {
    throw new Error('User can rate the blog only once')
  }

  const blog = await Blog.findById(blogId)

  if (!blog) {
    throw new Error("Couldn't find matching blog")
  }

  const blogRating: IBlogRating = {
    ...newRating,
    authorId: user._id as mongoose.ObjectId,
    blogId: blogId,
  }

  const newBlogRating = new BlogRating(blogRating)

  const savedRating = await newBlogRating.save()

  if (user.blogRatings) {
    user.blogRatings.push(savedRating._id as mongoose.ObjectId)
  } else {
    user.blogRatings = [savedRating._id as mongoose.ObjectId]
  }
  await user.save()

  if (!blog.totalRatings) {
    blog.totalRatings = 1
    blog.avgRating = savedRating.value
    blog.ratings = [savedRating._id as mongoose.ObjectId]
  } else {
    blog.ratings.push(savedRating._id as mongoose.ObjectId)
    blog.avgRating =
      (blog.avgRating * blog.totalRatings + savedRating.value) /
      (blog.totalRatings + 1)
    blog.totalRatings = blog.totalRatings + 1
  }

  await blog.save()
  return savedRating
}

const update = async (
  user: IUserDocument,
  blogId: string,
  ratingId: string,
  rating: unknown
) => {
  const ratingUpdate = toNewRating(rating)

  const blog = await Blog.findById(blogId)
  if (!blog) {
    throw new Error("Couldn't find matching blog")
  }

  const ratingToUpdate = await getById(ratingId)

  if (user.id !== ratingToUpdate.authorId.toString()) {
    throw new Error('User can delete only his own comments')
  }

  blog.avgRating =
    (blog.avgRating * blog.totalRatings +
      (ratingUpdate.value - ratingToUpdate.value)) /
    blog.totalRatings

  ratingToUpdate.value = ratingUpdate.value
  await ratingToUpdate.save()

  await blog.save()

  return ratingToUpdate
}

const remove = async (
  user: IUserDocument,
  blogId: string,
  ratingId: string
) => {
  if (!isRatingValue(ratingId)) {
    throw new Error('Incorrect rating value')
  }

  const ratingToDelete = await getById(ratingId)

  if (user.id !== ratingToDelete.authorId.toString()) {
    throw new Error('User can delete only his own ratings')
  }

  const blog = await Blog.findById(blogId)

  if (!blog) {
    throw new Error('Blog has been deleted')
  }

  await ratingToDelete.deleteOne()

  user.blogRatings.filter((id) => id.toString() === ratingToDelete.id)
  await user.save()

  if (blog.totalRatings === 1) {
    blog.ratings = []
    blog.avgRating = 0
    blog.totalRatings = 0
  } else {
    blog.ratings.filter((id) => id.toString() === ratingToDelete.id)
    blog.avgRating =
      (blog.avgRating * blog.totalRatings - ratingToDelete.value) /
      (blog.totalRatings - 1)
    blog.totalRatings = blog.totalRatings - 1
  }
  await blog.save()
}

export default { getAll, getById, getUserRating, add, update, remove }
