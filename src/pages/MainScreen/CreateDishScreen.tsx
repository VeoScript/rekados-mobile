import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import CreateDishLayout from '../../layouts/Panels/CreateDishLayout'
import { BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigate } from '../../utils/RootNavigation'

const CreateDishScreen = () => {

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
    <MainLayout>
      <CreateDishLayout />
    </MainLayout>
  )
}

export default CreateDishScreen