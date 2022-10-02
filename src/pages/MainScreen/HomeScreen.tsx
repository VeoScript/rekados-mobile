import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import FeedLayout from '../../layouts/Panels/FeedLayout'
import SplashScreen from '../../layouts/Misc/SplashScreen'
import ErrorScreen from '../../layouts/Misc/ErrorScreen'
import { useGetUser } from '../../lib/ReactQuery'

const HomeScreen = () => {

  const { data: user, isLoading: userLoading, isError: userError, error }: any = useGetUser()

  if (userLoading) return <SplashScreen />
  if (userError) return <ErrorScreen error={error.response?.data?.message} />

  return (
    <MainLayout user={user} >
      <FeedLayout user={user} />
    </MainLayout>
  )
}

export default HomeScreen