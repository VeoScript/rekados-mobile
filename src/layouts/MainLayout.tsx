import React from 'react'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native'
import NavBar from '../components/NavBar'
import BottomBar from '../components/BottomBar'
import { useRoute } from '@react-navigation/native'

interface TypedProps {
  children: any
}

const MainLayout: React.FC<TypedProps> = ({ children }) => {

  const route = useRoute()

  return (
    <SafeAreaView style={tw`flex flex-col items-center justify-between w-full h-full bg-white`}>
      <NavBar />
      { children }
      {route.name !== 'DisplayDishScreen' && (
        <BottomBar />
      )}
    </SafeAreaView>
  )
}

export default MainLayout