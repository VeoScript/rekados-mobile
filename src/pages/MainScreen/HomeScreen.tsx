import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import FeedLayout from '../../layouts/Panels/FeedLayout'
import { View, Text } from 'react-native'
import { useGetUser } from '../../lib/ReactQuery'

const HomeScreen = () => {

  const { data: user, isLoading, isError, error }: any = useGetUser('cl7wptull00590mudfbl3gkdo')

  if (isLoading) return <View><Text>Loading...</Text></View>

  if (isError) return <View><Text>{`${error.response?.data.message}`}</Text></View>
  
  console.log(user)

  return (
    <MainLayout>
      <FeedLayout />
    </MainLayout>
  )
}

export default HomeScreen