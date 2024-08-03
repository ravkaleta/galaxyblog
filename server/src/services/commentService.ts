import Comment, { IComment, ICommentDocument } from '../models/Comment'

const getRelated = async (blogId: string) => {
  return await Comment.find({ blogId })
}

const add = async (obj: IComment): Promise<ICommentDocument> => {
  const newComment = new Comment({
    ...obj,
  })

  return await newComment.save()
}

const remove = async (objId: string) => {
  return await Comment.findOneAndDelete({ _id: objId })
}

export default { getRelated, add, remove }
