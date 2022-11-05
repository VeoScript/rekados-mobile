import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import FeedLayout from '../../layouts/Panels/FeedLayout'
import MainSplashScreen from '../../components/SplashScreens/MainSplashScreen'
import { useGetUser } from '../../lib/ReactQuery'

const HomeScreen = () => {

  const { data: user, isLoading: userLoading, isError }: any = useGetUser()

  if (userLoading || isError) return <MainSplashScreen />

  return (
    <MainLayout user={user}>
      <FeedLayout user={user} />
    </MainLayout>
  )
}

export default HomeScreen