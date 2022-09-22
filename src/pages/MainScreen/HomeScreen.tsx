import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import FeedLayout from '../../layouts/Panels/FeedLayout'
import SplashScreen from '../../layouts/Misc/SplashScreen'
import { useGetUser, useGetDishes } from '../../lib/ReactQuery'

const HomeScreen = () => {

  const { data: user, isLoading: userLoading, isError: userError }: any = useGetUser()
  const { data: dishes, isLoading: dishesIsLoading, isError: dishesIsError }: any = useGetDishes()

  if (userLoading || dishesIsLoading) return <SplashScreen />

  console.log({
    'title': 'Home Screen Dishes',
    'content': dishes.dishes
  })

  return (
    <MainLayout user={user} >
      <FeedLayout />
    </MainLayout>
  )
}

export default HomeScreen