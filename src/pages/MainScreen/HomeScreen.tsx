import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import FeedLayout from '../../layouts/Panels/FeedLayout'

interface TypedProps {
  navigation: any
}

const HomeScreen: React.FC<TypedProps> = ({ navigation }) => {
  return (
    <MainLayout
      navigation={navigation}
    >
      <FeedLayout navigation={navigation} />
    </MainLayout>
  )
}

export default HomeScreen