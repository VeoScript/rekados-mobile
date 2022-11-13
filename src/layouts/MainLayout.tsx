import React from 'react'
import tw from 'twrnc'
import NavBar from '../components/NavBar'
import BottomBar from '../components/BottomBar'
import { SafeAreaView, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useGetCountNotifications } from '../lib/ReactQuery'

interface MainLayoutTypes {
  user: any
  children: any
}

const MainLayout: React.FC<MainLayoutTypes> = ({ user, children }) => {

  const route = useRoute()

  const { data: countUnreadNotifications, isLoading, isError } = useGetCountNotifications(user.id)

  return (
    <SafeAreaView style={tw`flex flex-col items-center justify-between w-full h-full bg-white dark:bg-[#262626]`}>
      <NavBar user={user} />
      <View style={tw`flex-1 w-full`}>
        { children }
      </View>
      {(route.name !== 'DisplayDishScreen' && route.name !== 'EditDishScreen') && (
        <BottomBar countUnreadNotifications={!(isLoading || isError) && countUnreadNotifications} />
      )}
    </SafeAreaView>
  )
}

export default MainLayout