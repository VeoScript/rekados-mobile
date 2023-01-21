import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useGuard = () => {
  // checking the session
  const [session, setSession] = React.useState<string>()

  React.useEffect(() => {
    let interval = setInterval(async () => {
      const cookies: any = await AsyncStorage.getItem('COOKIES')
      setSession(cookies)
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return session === null ? false : true
}