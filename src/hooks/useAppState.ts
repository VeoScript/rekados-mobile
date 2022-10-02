import React from 'react'
import { AppState, AppStateStatus } from 'react-native'

export const useAppState = (onChange: (status: AppStateStatus) => void) => {
  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', onChange)
    return () => {
      subscription.remove()
    }
  }, [onChange])
}