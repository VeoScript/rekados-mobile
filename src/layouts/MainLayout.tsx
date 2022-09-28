import React from 'react'
import tw from 'twrnc'
import NavBar from '../components/NavBar'
import BottomBar from '../components/BottomBar'
import { SafeAreaView, View } from 'react-native'
import { useRoute } from '@react-navigation/native'

interface MainLayoutTypes {
  user: any
  children: any
}

const MainLayout: React.FC<MainLayoutTypes> = ({ user, children }) => {

  const route = useRoute()

  return (
    <SafeAreaView style={tw`flex flex-col items-center justify-between w-full h-full bg-white`}>
      <NavBar user={user} />
      <View style={tw`flex-1 w-full`}>
        { children }
      </View>
      {route.name !== 'DisplayDishScreen' && (
        <BottomBar />
      )}
    </SafeAreaView>
  )
}

export default MainLayout