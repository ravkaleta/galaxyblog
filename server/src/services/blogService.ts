import Blog, { IBlogDocument, IBlog, INewBlog } from '../models/Blog'

const getAll = async (): Promise<IBlogDocument[]> => {
  const blogs = await Blog.find({})
  return blogs
}

const getById = async (id: string): Promise<IBlogDocument> => {
  const blog = await Blog.findById(id)

  if (!blog) {
    throw new Error("There's no blog with that id")
  }
  return blog
}

const add = async (blog: IBlog): Promise<IBlogDocument> => {
  const newBlog = new Blog({
    ...blog,
  })

  return await newBlog.save()
}

const remove = async (blogId: string) => {
  return await Blog.findOneAndDelete({ _id: blogId })
}

const update = async (
  blogId: string,
  blogObject: INewBlog
): Promise<IBlogDocument> => {
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, blogObject, {
    new: true,
  })

  if (!updatedBlog) {
    throw new Error('Invalid blog id')
  }

  return updatedBlog
}

export default { getAll, add, remove, update, getById }
