import React, { createContext, useState } from 'react'

export interface IUser {
  token: string
  username: string
  id: string
}

export type IUserType = IUser | null

export interface IUserContext {
  user: IUserType
  setUser: React.Dispatch<React.SetStateAction<IUserType>>
}

export const UserContext = createContext<IUserContext | null>(null)

export const UserProvider = (props: React.PropsWithChildren) => {
  const [user, setUser] = useState<IUserType>(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
