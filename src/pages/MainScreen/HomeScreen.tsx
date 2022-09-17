import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import FeedLayout from '../../layouts/Panels/FeedLayout'
import SplashScreen from '../../layouts/Misc/SplashScreen'
import { useGetUser } from '../../lib/ReactQuery'

const HomeScreen = () => {

  const { data: fetch, isLoading, isError }: any = useGetUser()

  if (isLoading || isError) return <SplashScreen />

  const user = fetch.data

  // console.log({
  //   'title': 'Home Screen',
  //   'content': user
  // })

  return (
    <MainLayout user={user} >
      <FeedLayout />
    </MainLayout>
  )
}

export default HomeScreen