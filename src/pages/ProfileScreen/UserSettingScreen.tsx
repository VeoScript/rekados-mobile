import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import UserSettingsLayout from '../../layouts/Panels/UserSettingsLayout'
import ProfileSkeletonLoader from '../../components/SkeletonLoaders/ProfileSkeletonLoader'
import { useGetUser, useGetUserById } from '../../lib/ReactQuery'
import { useRoute } from '@react-navigation/native'

const UserSettingScreen = () => {

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
        <UserSettingsLayout
          user={profile}
          profileId={user.id}
        />
      )}
    </MainLayout>
  )
}

export default UserSettingScreen