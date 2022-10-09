import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import SaveDishLayout from '../../layouts/Panels/SaveDishLayout'
import SplashScreen from '../../layouts/Misc/SplashScreen'
import ErrorScreen from '../../layouts/Misc/ErrorScreen'
import { View, Text, BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigate } from '../../utils/RootNavigation'
import { useGetUser } from '../../lib/ReactQuery'

const SaveDishScreen = () => {

  const { data: user, isLoading, isError, error }: any = useGetUser()

  if (isLoading) return <SplashScreen />
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
      <SaveDishLayout user={user} />
    </MainLayout>
  )
}

export default SaveDishScreen