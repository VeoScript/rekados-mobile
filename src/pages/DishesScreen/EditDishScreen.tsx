import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import EditDishLayout from '../../layouts/Panels/EditDishLayout'
import MainSplashScreen from '../../components/SplashScreens/MainSplashScreen'
import ErrorScreen from '../../components/SplashScreens/ErrorScreen'
import { BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigate } from '../../utils/RootNavigation'
import { useRoute } from '@react-navigation/native'
import { useGetUser } from '../../lib/ReactQuery'

const EditDishScreen = () => {

  const route: any = useRoute()

  const { slug } = route.params

  const { data: user, isLoading, isError, error }: any = useGetUser()

  if (isLoading) return <MainSplashScreen />
  if (isError) return <ErrorScreen error={error.response?.data?.message} />

  // Nig click sa users ug back button muback ra jd sija padong sa HomeScreen
  const handleBackToHomeScreen = () => {
    useNavigate('DisplayDishScreen', { slug: slug })
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
      <EditDishLayout user={user} />
    </MainLayout>
  )
}

export default EditDishScreen