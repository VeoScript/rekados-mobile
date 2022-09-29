import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import FeedLayout from '../../layouts/Panels/FeedLayout'
import SplashScreen from '../../layouts/Misc/SplashScreen'
import { useGetUser } from '../../lib/ReactQuery'

const HomeScreen = () => {

  const { data: user, isLoading: userLoading, isError: userError }: any = useGetUser()

  if (userLoading) return <SplashScreen />

  return (
    <MainLayout user={user} >
      <FeedLayout user={user} />
    </MainLayout>
  )
}

export default HomeScreen