import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import FeedLayout from '../../layouts/Panels/FeedLayout'
import { View, Text } from 'react-native'
import { useGetUsers } from '../../lib/ReactQuery'

const HomeScreen = () => {

  const { data, isLoading, isError, error }: any = useGetUsers()

  if (isLoading) return <View><Text>Loading...</Text></View>

  if (isError) return <View><Text>{`${error.response?.data.message}`}</Text></View>
  
  console.log(data)

  return (
    <MainLayout>
      <FeedLayout />
    </MainLayout>
  )
}

export default HomeScreen