export interface Blog {
  id: string
  title: string
  text: string
  imageUrl?: string
  authorId: string
  authorName: string
  date: string
}

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
