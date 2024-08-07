export interface Blog {
  id: string
  title: string
  text: string
  imageUrl?: string
  authorId: string
  authorName: string
  date: string
}

export interface Comment {
  id: string
  content: string
  date: string
  blogId: string
  authorName: string
  authorId: string
}

export type NewComment = Pick<Comment, 'content'>

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  username: string
  password: string
  repeatPassword: string
}
