import mongoose from 'mongoose'
import Comment, { IComment, ICommentDocument } from '../models/Comment'
import { IUserDocument } from '../models/User'
import { toNewComment } from '../utils/parsers/commentParser'
import Blog from '../models/Blog'

const getRelated = async (blogId: string): Promise<ICommentDocument[]> => {
  return await Comment.find({ blogId })
}

const getById = async (blogId: string): Promise<ICommentDocument> => {
  const comment = await Comment.findById(blogId)

  if (!comment) {
    throw new Error("Could't find blog with that id")
  }

  return comment
}

const add = async (
  user: IUserDocument,
  blogId: string,
  commentObject: unknown
): Promise<ICommentDocument> => {
  const blog = await Blog.findById(blogId)
  if (!blog) {
    throw new Error("Couldn't find matching blog")
  }

  const parsedComment = toNewComment(commentObject)

  const comment: IComment = {
    ...parsedComment,
    date: new Date().toISOString(),
    blogId: blogId,
    authorName: user.username,
    authorId: user._id as mongoose.ObjectId,
  }

  const newComment = new Comment(comment)

  const savedComment = await newComment.save()

  user.comments.push(savedComment._id as mongoose.ObjectId)
  await user.save()

  blog.ratings.push(savedComment._id as mongoose.ObjectId)
  await blog.save()

  return savedComment
}

const remove = async (
  user: IUserDocument,
  blogId: string,
  commentId: string
) => {
  const commentToDelete = await getById(commentId)

  if (user.id !== commentToDelete.authorId.toString()) {
    throw new Error('User can delete only his own comments')
  }

  const commentedBlog = await Blog.findById(blogId)

  if (!commentedBlog) {
    throw new Error('Blog has been deleted')
  }

  await commentToDelete.deleteOne()

  user.comments.filter((id) => id.toString() !== commentToDelete.id)
  await user.save()

  commentedBlog.comments.filter((id) => id.toString() !== commentToDelete.id)
  await commentedBlog.save()
}

export default { getRelated, add, remove, getById }
