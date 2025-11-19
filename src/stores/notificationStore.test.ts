import { describe, it, expect, beforeEach } from 'vitest'
import { useNotificationStore } from './notificationStore'

describe('notificationStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useNotificationStore.setState({
      notifications: [],
      unreadCount: 0
    })
  })

  it('should initialize with empty state', () => {
    const { notifications, unreadCount } = useNotificationStore.getState()
    expect(notifications).toEqual([])
    expect(unreadCount).toBe(0)
  })

  it('should add notification correctly', () => {
    const { addNotification } = useNotificationStore.getState()

    addNotification({
      title: 'Test Notification',
      message: 'This is a test',
      type: 'info'
    })

    const { notifications, unreadCount } = useNotificationStore.getState()
    expect(notifications).toHaveLength(1)
    expect(notifications[0].title).toBe('Test Notification')
    expect(notifications[0].isRead).toBe(false)
    expect(unreadCount).toBe(1)
  })

  it('should mark notification as read', () => {
    const { addNotification, markAsRead } = useNotificationStore.getState()

    addNotification({
      title: 'Test Notification',
      message: 'This is a test',
      type: 'info'
    })

    const { notifications: addedNotifications } = useNotificationStore.getState()
    const notificationId = addedNotifications[0].id

    markAsRead(notificationId)

    const { notifications, unreadCount } = useNotificationStore.getState()
    expect(notifications[0].isRead).toBe(true)
    expect(unreadCount).toBe(0)
  })

  it('should mark all notifications as read', () => {
    const { addNotification, markAllAsRead } = useNotificationStore.getState()

    addNotification({
      title: 'Test 1',
      message: 'Message 1',
      type: 'info'
    })

    addNotification({
      title: 'Test 2',
      message: 'Message 2',
      type: 'success'
    })

    markAllAsRead()

    const { notifications, unreadCount } = useNotificationStore.getState()
    expect(notifications.every(n => n.isRead)).toBe(true)
    expect(unreadCount).toBe(0)
  })

  it('should remove notification correctly', () => {
    const { addNotification, removeNotification } = useNotificationStore.getState()

    addNotification({
      title: 'Test Notification',
      message: 'This is a test',
      type: 'info'
    })

    const { notifications: addedNotifications } = useNotificationStore.getState()
    const notificationId = addedNotifications[0].id

    removeNotification(notificationId)

    const { notifications, unreadCount } = useNotificationStore.getState()
    expect(notifications).toHaveLength(0)
    expect(unreadCount).toBe(0)
  })
})