import { useContext } from 'react'
import { UserContext } from './UserProvider'
import { NotificationContext } from './NotificationProvider'

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a UserProvider')
  }

  return context
}
