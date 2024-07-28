import React, { createContext, useState } from 'react'

export interface INotification {
  type: 'error' | 'warning' | 'success'
  content: string
}

export type INotificationType = INotification | null

export interface INotificationContext {
  notification: INotificationType
  setNotification: React.Dispatch<React.SetStateAction<INotificationType>>
  setTempNotification: (
    type: INotification['type'],
    content: string,
    duration: number
  ) => void
}

export const NotificationContext = createContext<INotificationContext | null>(
  null
)

export const NotificationProvider = (props: React.PropsWithChildren) => {
  const [notification, setNotification] = useState<INotificationType>(null)

  const setTempNotification = (
    type: INotification['type'],
    content: string,
    durationInSeconds: number
  ) => {
    setNotification({ type, content })
    setTimeout(() => {
      setNotification(null)
    }, durationInSeconds * 1000)
  }

  return (
    <NotificationContext.Provider
      value={{ notification, setNotification, setTempNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}
