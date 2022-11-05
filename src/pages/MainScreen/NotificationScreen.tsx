import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import NotificationsLayout from '../../layouts/Panels/NotificationsLayout'
import MainSplashScreen from '../../components/SplashScreens/MainSplashScreen'
import ErrorScreen from '../../components/SplashScreens/ErrorScreen'
import { BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigate } from '../../utils/RootNavigation'
import { useGetUser } from '../../lib/ReactQuery'

const NotificationScreen = () => {

  const { data: user, isLoading, isError, error }: any = useGetUser()

  if (isLoading) return <MainSplashScreen />
  if (isError) return <ErrorScreen error={error.response?.data?.message} />

  // Nig click sa users ug back button muback ra jd sija padong sa HomeScreen
  const handleBackToHomeScreen = () => {
    useNavigate('HomeScreen')
  }

  useFocusEffect(
    React.useCallback(() => {

      const onBackPress = () => {
        handleBackToHomeScreen()
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [handleBackToHomeScreen])
  )

  return (
    <MainLayout user={user} >
      <NotificationsLayout user={user}/>
    </MainLayout>
  )
}

export default NotificationScreen