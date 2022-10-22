import { ToastAndroid } from 'react-native'

export const Toast = (message: string) => {
  ToastAndroid.showWithGravityAndOffset(
    `${message}`,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    0,
    110
  )
}