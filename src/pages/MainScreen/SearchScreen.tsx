import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import SearchLayout from '../../layouts/Panels/SearchLayout'
import SplashScreen from '../../layouts/Misc/SplashScreen'
import ErrorScreen from '../../layouts/Misc/ErrorScreen'
import { useGetUser } from '../../lib/ReactQuery'

const SearchScreen = () => {

  const { data: user, isLoading, isError, error }: any = useGetUser()

  if (isLoading) return <SplashScreen />
  if (isError) return <ErrorScreen error={error.response?.data?.message} />

  return (
    <MainLayout user={user} >
      <SearchLayout />
    </MainLayout>
  )
}

export default SearchScreen