import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import UserProfileLayout from '../../layouts/Panels/UserProfileLayout'
import ProfileSkeletonLoader from '../../components/SkeletonLoaders/ProfileSkeletonLoader'
import { useGetUser, useGetUserById } from '../../lib/ReactQuery'
import { useRoute } from '@react-navigation/native'

const UserScreen = () => {

  const route: any = useRoute()

  const { id } = route.params

  const { data: user, isLoading: userLoading }: any = useGetUser()
  const { data: profile, isLoading: profileLoading }: any = useGetUserById(id)

  return (
    <MainLayout user={user}>
      {(userLoading || profileLoading) && (
        <ProfileSkeletonLoader />
      )}
      {!(userLoading || profileLoading) && (
        <UserProfileLayout
          user={profile}
          profileId={user.id}
        />
      )}
    </MainLayout>
  )
}

export default UserScreen