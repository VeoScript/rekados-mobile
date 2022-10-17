import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import UserProfileLayout from '../../layouts/Panels/UserProfileLayout'
import { View, Text } from 'react-native'
import { useGetUser, useGetUserById } from '../../lib/ReactQuery'
import { useRoute } from '@react-navigation/native'

const UserScreen = () => {

  const route: any = useRoute()

  const { id } = route.params

  const { data: user, isLoading: userLoading }: any = useGetUser()
  const { data: profile, isLoading: profileLoading }: any = useGetUserById(id)

  if (userLoading || profileLoading) return <View><Text>Loading...</Text></View>

  return (
    <MainLayout user={user}>
      <UserProfileLayout user={profile} />
    </MainLayout>
  )
}

export default UserScreen