import React, { useCallback } from 'react'
import tw from 'twrnc'
import MainLayout from '../../layouts/MainLayout'
import SplashScreen from '../../layouts/Misc/SplashScreen'
import ErrorScreen from '../../layouts/Misc/ErrorScreen'
import YoutubePlayer from 'react-native-youtube-iframe'
import { ScrollView, View, Text, Image, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { fonts } from '../../styles/global'
import { MaterialIcon } from '../../utils/Icons'
import { Toast } from '../../utils/Toast'
import { useGetUser } from '../../lib/ReactQuery'

const DisplayDishScreen = () => {

  const route: any = useRoute()

  const {
    id,
    title,
    image,
    category,
    location,
    description,
    author,
    youtubeId,
    ingredients,
    procedures
  } = route.params

  const { data: fetch, isLoading, isError, error }: any = useGetUser()

  if (isLoading) return <SplashScreen />
  if (isError) return <ErrorScreen error={error.response?.data?.message} />

  const user = fetch.data

  const onStateChange = React.useCallback((state: any) => {
    if (state === 'ended') {
      Toast('Video has finished playing.')
    }
  }, [])

  return (
    <MainLayout user={user} >
      <ScrollView style={tw`w-full`}>
        <View style={tw`flex flex-col items-start justify-start w-full px-5 py-5`}>
          <View style={tw`flex flex-col items-center w-full`}>
            <Text style={[tw`ml-1 text-3xl text-neutral-600`, fonts.fontPoppinsBlack]}>{ title }</Text>
            <Text style={[tw`mt-1 px-2 py-0.5 rounded-full text-sm text-white bg-[#f2b900]`, fonts.fontPoppinsLight]}>{ category }</Text>
            <View style={tw`mt-3`}>
              <Text style={[tw`text-lg text-center text-neutral-500`, fonts.fontPoppinsBold]}>{ location }</Text>
              <Text style={[tw`text-sm text-center text-neutral-400`, fonts.fontPoppins]}>by { author }</Text>
            </View>
          </View>
          <View style={tw`w-full overflow-hidden rounded-xl my-3`}>
            <Image
              style={tw`flex w-full h-[12rem]`}
              resizeMode="cover"
              source={{
                uri: `${ image }`
              }}
            />
          </View>
          <View style={tw`flex flex-col items-center w-full pb-5`}>
            <Text style={[tw`mt-3 px-3 text-base text-center text-neutral-500`, fonts.fontPoppins]}>{ description }</Text>
          </View>
          <View style={tw`flex flex-col items-start w-full overflow-hidden`}>
            <Text style={[tw`text-xl text-center text-neutral-500 uppercase`, fonts.fontPoppinsBold]}>Ingredients</Text>
            {ingredients.map((ingredient: { name: string }, i: number) => (
              <View key={i} style={tw`flex flex-row items-center mt-2`}>
                <MaterialIcon
                  name="dot-fill"
                  size="small"
                  color="#c3c3c3"
                />
                <Text style={[tw`w-[15rem] ml-2 text-base`, fonts.fontPoppins]}>{ ingredient.name }</Text>
              </View>
            ))}
          </View>
          <View style={tw`flex flex-col items-start w-full mt-5 overflow-hidden`}>
            <Text style={[tw`text-xl text-center text-neutral-500 uppercase`, fonts.fontPoppinsBold]}>Procedures</Text>
            {procedures.map((procedure: { name: string }, i: number) => (
              <View key={i} style={tw`flex flex-row items-start mt-2`}>
                <Text style={[tw`text-base text-neutral-400`, fonts.fontPoppinsBold]}>Step {i + 1}: </Text>
                <Text style={[tw`w-[15rem] ml-1 text-base`, fonts.fontPoppins]}>{ procedure.name }</Text>
              </View>
            ))}
          </View>
          {youtubeId && (
            <View style={tw`flex flex-col items-start w-full mt-5 overflow-hidden`}>
              <Text style={[tw`mb-3 text-xl text-center text-neutral-500 uppercase`, fonts.fontPoppinsBold]}>YouTube Video</Text>
              <View style={tw`relative overflow-hidden rounded-xl w-full bg-neutral-100`}>
                <View style={tw`absolute flex flex-row items-center justify-center w-full h-full`}>
                  <ActivityIndicator size="large" color="#f2b900" />
                </View>
                <YoutubePlayer
                  height={180}
                  videoId={youtubeId}
                  onChangeState={onStateChange}
                />
              </View>
            </View>
          )}
        </View>
        <View style={tw`flex flex-row items-center justify-center w-full py-3`}>
          <Text style={[tw`text-xs text-neutral-400`, fonts.fontPoppinsLight]}>
            &copy; 2022 Rekados. All rights reserved.
          </Text>
        </View>
      </ScrollView>
    </MainLayout>
  )
}

export default DisplayDishScreen