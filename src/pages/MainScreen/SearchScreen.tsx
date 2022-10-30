import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import SearchLayout from '../../layouts/Panels/SearchLayout'
import MainSplashScreen from '../../components/SplashScreens/MainSplashScreen'
import ErrorScreen from '../../components/SplashScreens/ErrorScreen'
import { useGetUser } from '../../lib/ReactQuery'

const SearchScreen = () => {

  const { data: user, isLoading, isError, error }: any = useGetUser()

  if (isLoading) return <MainSplashScreen />
  if (isError) return <ErrorScreen error={error.response?.data?.message} />

  return (
    <MainLayout user={user} >
      <SearchLayout userId={user.id} />
    </MainLayout>
  )
}

export default SearchScreen