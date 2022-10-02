import React from 'react'
import tw from 'twrnc'
import MainLayout from '../../layouts/MainLayout'
import DishComments from '../../components/Cards/DishComments'
import SplashScreen from '../../layouts/Misc/SplashScreen'
import ErrorScreen from '../../layouts/Misc/ErrorScreen'
import ViewDishSkeletonLoader from '../../components/SkeletonLoaders/ViewDishSkeletonLoader'
import LikeButton from '../../components/Interactions/LikeButton'
import YoutubePlayer from 'react-native-youtube-iframe'
import { ScrollView, View, Text, Image, ActivityIndicator } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { fonts } from '../../styles/global'
import { MaterialIcon } from '../../utils/Icons'
import { Toast } from '../../utils/Toast'
import { useGetUser, useGetDish } from '../../lib/ReactQuery'

const DisplayDishScreen = () => {

  const route: any = useRoute()

  const { slug } = route.params

  const { data: user, isLoading, isError, error }: any = useGetUser()
  const { data: dish, isLoading: dishIsLoading, isError: dishIsError, error: dishError }: any = useGetDish(slug)

  if (isLoading) return <SplashScreen />
  if (isError) return <ErrorScreen error={error.response?.data?.message} />
  if (dishIsError) return <ErrorScreen error={dishError.response?.data?.message} />

  const onStateChange = React.useCallback((state: any) => {
    if (state === 'ended') {
      Toast('Video has finished playing.')
    }
  }, [])

  return (
    <MainLayout user={user} >
      <ScrollView style={tw`w-full`}>
        {dishIsLoading && (
          <ViewDishSkeletonLoader />
        )}
        {!dishIsLoading && (
          <React.Fragment>
            <View style={tw`relative flex flex-col items-start justify-start w-full px-5 py-5`}>
              <View style={tw`flex flex-col items-center w-full`}>
                <Text style={[tw`ml-1 text-3xl text-neutral-600`, fonts.fontPoppinsBlack]}>{ dish.title }</Text>
                <Text style={[tw`mt-1 px-2 py-0.5 rounded-full text-sm text-white bg-[#f2b900]`, fonts.fontPoppinsLight]}>{ dish.category }</Text>
                <View style={tw`mt-3`}>
                  <Text style={[tw`text-lg text-center text-neutral-500`, fonts.fontPoppinsBold]}>{ dish.location }</Text>
                  <Text style={[tw`text-sm text-center text-neutral-400`, fonts.fontPoppins]}>by { dish.author.name }</Text>
                </View>
              </View>
              <View style={tw`absolute top-5 right-5`}>
                <LikeButton
                  user={user}
                  slug={slug}
                  likes={dish.likes}
                />
              </View>
              <View style={tw`w-full overflow-hidden rounded-xl my-3`}>
                <Image
                  style={tw`flex w-full h-[12rem]`}
                  resizeMode="cover"
                  source={{
                    uri: `${ dish.image }`
                  }}
                />
              </View>
              <View style={tw`flex flex-col items-center w-full pb-5`}>
                <Text style={[tw`mt-3 px-3 text-base text-center text-neutral-500`, fonts.fontPoppins]}>{ dish.description }</Text>
              </View>
              <View style={tw`flex flex-col items-start w-full overflow-hidden`}>
                <Text style={[tw`text-xl text-center text-neutral-500 uppercase`, fonts.fontPoppinsBold]}>Ingredients</Text>
                {dish.ingredients.map((ingredient: { name: string }, i: number) => (
                  <View key={i} style={tw`flex flex-row items-start mt-2`}>
                    <MaterialIcon
                      name="dot-fill"
                      size="small"
                      color="#f2b900"
                    />
                    <Text style={[tw`w-[15rem] ml-2 text-base`, fonts.fontPoppins]}>{ ingredient.name }</Text>
                  </View>
                ))}
              </View>
              <View style={tw`flex flex-col items-start w-full mt-5 overflow-hidden`}>
                <Text style={[tw`text-xl text-center text-neutral-500 uppercase`, fonts.fontPoppinsBold]}>Procedures</Text>
                {dish.procedures.map((procedure: { details: string }, i: number) => (
                  <View key={i} style={tw`flex flex-row items-start mt-2`}>
                    <Text style={[tw`text-base text-[#f2b900]`, fonts.fontPoppinsBold]}>Step {i + 1}: </Text>
                    <Text style={[tw`w-[15rem] ml-1 text-base`, fonts.fontPoppins]}>{ procedure.details }</Text>
                  </View>
                ))}
              </View>
              {dish.youtube && (
                <View style={tw`flex flex-col items-start w-full mt-5 overflow-hidden`}>
                  <Text style={[tw`mb-3 text-xl text-center text-neutral-500 uppercase`, fonts.fontPoppinsBold]}>YouTube Video</Text>
                  <View style={tw`relative overflow-hidden rounded-xl w-full bg-neutral-100`}>
                    <View style={tw`absolute flex flex-row items-center justify-center w-full h-full`}>
                      <ActivityIndicator size="large" color="#f2b900" />
                    </View>
                    <YoutubePlayer
                      height={180}
                      videoId={dish.youtube}
                      onChangeState={onStateChange}
                    />
                  </View>
                </View>
              )}
            </View>
            <DishComments slug={slug} />
            <View style={tw`flex flex-row items-center justify-center w-full py-3`}>
              <Text style={[tw`text-xs text-neutral-400`, fonts.fontPoppinsLight]}>
                &copy; 2022 Rekados. All rights reserved.
              </Text>
            </View>
          </React.Fragment>
        )}
      </ScrollView>
    </MainLayout>
  )
}

export default DisplayDishScreen