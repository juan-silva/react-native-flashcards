import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'Udacity:notifications'

export function timeToString (time = Date.now()) {
  const date = new Date(time)
  const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return todayUTC.toISOString().split('T')[0]
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Take a Quiz Today!',
    body: "👋 don't forget to practice a question deck today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}


export function setLocalNotification () {
  console.log("setting notifications....")
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data) => {
      data  = JSON.parse(data)
        console.log("got data", data)
      if (data) {
        console.log("Asking for permissions...")
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            console.log("Asking for permissions...", status)
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              //tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setDate(tomorrow.getDate()+1)
              tomorrow.setHours(6)
              tomorrow.setMinutes(26)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

