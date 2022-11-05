import React from 'react'
import MainLayout from '../../../layouts/MainLayout'
import MainSplashScreen from '../../../components/SplashScreens/MainSplashScreen'
import ErrorScreen from '../../../components/SplashScreens/ErrorScreen'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { ScrollView, View, Text, Image } from 'react-native'
import { useGetUser } from '../../../lib/ReactQuery'

const AboutScreen = () => {

  const { data: user, isLoading: userLoading, isError, error }: any = useGetUser()

  if (userLoading) return <MainSplashScreen />
  if (isError) return <ErrorScreen error={error.response?.data?.message} />

  return (
    <MainLayout user={user}>
      <ScrollView contentContainerStyle={tw`flex-1 px-3`}>
        <View style={tw`flex-col items-start justify-between w-full h-full p-2`}>
          <View style={tw`flex-col w-full`}>
            <View>
              <Text style={[tw`text-2xl text-neutral-600 my-2`, fonts.fontPoppinsBold]}>About App</Text>
              <Text style={[tw`text-justify text-lg text-neutral-500`, fonts.fontPoppins]}>
                Rekados is a social media app for people who want to share and explore new recipes and dishes.
                With Rekados, you can easily find and follow the cooks and foodies that inspire you, and get recommendations for new recipes and dishes to try.
                You can also use Rekados to save your favorite recipes.
              </Text>
              <Text style={[tw`text-justify text-lg text-neutral-500 my-3`, fonts.fontPoppins]}>
                Rekados was founded in 2022 by two food lovers who wanted to create a space where people could connect with others who shared their passion for food.
                We believe that food is a universal language that brings people together, and we are committed to promoting exploration and discovery through our app.
              </Text>
            </View>
            <View>
              <Text style={[tw`text-2xl text-neutral-600`, fonts.fontPoppinsBold]}>Developer</Text>
              <Text style={[tw`text-justify text-lg text-neutral-500`, fonts.fontPoppins]}>
                Rekados was designed and developed by Jerome Villaruel (VEOSCRIPT), 2022.
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

export default AboutScreen