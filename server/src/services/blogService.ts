import Blog, { BlogDocument, BlogInput } from '../models/Blog'

const getAll = async (): Promise<BlogDocument[]> => {
  const blogs = await Blog.find({})
  return blogs
}

const add = async (blog: BlogInput): Promise<BlogDocument> => {
  const newBlog = new Blog({
    ...blog,
  })

  return await newBlog.save()
}

export default { getAll, add }
