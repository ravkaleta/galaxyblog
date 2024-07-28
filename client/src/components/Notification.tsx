import { useNotification } from '../providers/useContexts'

const Notification = () => {
  const { notification } = useNotification()

  if (!notification) {
    return null
  }

  const notificationColor = () => {
    switch (notification.type) {
      case 'error':
        return 'red'
      case 'warning':
        return 'orange'
      case 'success':
        return 'green'
      default:
        return 'black'
    }
  }

  return (
    <div>
      <p style={{ color: notificationColor() }}>{notification.content}</p>
    </div>
  )
}

export default Notification
