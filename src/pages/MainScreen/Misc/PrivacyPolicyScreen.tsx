import React from 'react'
import MainLayout from '../../../layouts/MainLayout'
import MainSplashScreen from '../../../components/SplashScreens/MainSplashScreen'
import ErrorScreen from '../../../components/SplashScreens/ErrorScreen'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { ScrollView, View, Text } from 'react-native'
import { useGetUser } from '../../../lib/ReactQuery'

const PrivacyPolicyScreen = () => {

  const { data: user, isLoading: userLoading, isError, error }: any = useGetUser()

  if (userLoading) return <MainSplashScreen />
  if (isError) return <ErrorScreen error={error.response?.data?.message} />

  return (
    <MainLayout user={user}>
      <ScrollView contentContainerStyle={tw`flex-1 px-3`}>
        <View style={tw`flex-col items-start justify-between w-full h-full p-2`}>
          <View style={tw`flex-col w-full`}>
            <View>
              <Text style={[tw`text-2xl text-neutral-600 my-2`, fonts.fontPoppinsBold]}>Privacy Policy</Text>
              <Text style={[tw`text-justify text-base text-neutral-500`, fonts.fontPoppins]}>
                This Privacy Policy was last modified on November 5, 2022
              </Text>
              <Text style={[tw`text-justify text-base text-neutral-500 my-3`, fonts.fontPoppins]}>
                Rekados by Jerome Villaruel (VEOSCRIPT) operates Rekados Mobile App.
                This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the App.
              </Text>
              <Text style={[tw`text-justify text-base text-neutral-500`, fonts.fontPoppins]}>
                We use your Personal Information only for providing and improving the Site. By using this Site, you agree to the collection and use of information in accordance with this policy.
              </Text>
            </View>
            <View style={tw`my-3`}>
              <Text style={[tw`text-2xl text-neutral-600 my-2`, fonts.fontPoppinsBold]}>Information Collection and Use</Text>
              <Text style={[tw`text-justify text-base text-neutral-500`, fonts.fontPoppins]}>
                While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you.
                Personally identifiable information may include, but is not limited to your name ("Personal Information").
              </Text>
            </View>
          </View>
          <View style={tw`flex flex-row items-center justify-center w-full py-2`}>
            <Text style={[tw`text-xs text-neutral-400`, fonts.fontPoppinsLight]}>
              &copy; 2022 Rekados. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  )
}

export default PrivacyPolicyScreen