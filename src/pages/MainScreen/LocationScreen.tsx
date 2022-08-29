import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import { View, Text, BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

interface TypedProps {
  navigation: any
}

const LocationScreen: React.FC<TypedProps> = ({ navigation }) => {

  // Nig click sa users ug back button muback ra jd sija padong sa HomeScreen
  const handleBackToHomeScreen = () => {
    navigation.navigate('HomeScreen')
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
    <MainLayout
      navigation={navigation}
    >
      <View>
        <Text>This is Location Screen</Text>
      </View>
    </MainLayout>
  )
}

export default LocationScreen