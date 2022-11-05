import React from 'react'
import tw from 'twrnc'
import MainLayout from '../../layouts/MainLayout'
import DishComments from '../../components/Cards/DishComments'
import MainSplashScreen from '../../components/SplashScreens/MainSplashScreen'
import ErrorScreen from '../../components/SplashScreens/ErrorScreen'
import ViewDishSkeletonLoader from '../../components/SkeletonLoaders/ViewDishSkeletonLoader'
import LikeButton from '../../components/Interactions/LikeButton'
import DeleteDish from '../../components/Modals/DeleteDish'
import YoutubePlayer from 'react-native-youtube-iframe'
import { ScrollView, View, Text, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useNavigate } from '../../utils/RootNavigation'
import { fonts } from '../../styles/global'
import { FeatherIcon, MaterialIcon } from '../../utils/Icons'
import { Toast } from '../../utils/Toast'
import { useGetUser, useGetDish } from '../../lib/ReactQuery'

const DisplayDishScreen = () => {
  
  const route: any = useRoute()

  const { slug } = route.params

  const [modalVisible, setModalVisible] = React.useState(false)

  const { data: user, isLoading, isError, error }: any = useGetUser()
  const { data: dish, isLoading: dishIsLoading, isError: dishIsError, error: dishError }: any = useGetDish(slug)

  if (isLoading) return <MainSplashScreen />
  if (isError) return <ErrorScreen error={error.response?.data?.message} />
  if (dishIsError) return <ErrorScreen error={dishError.response?.data?.message} />

  const onStateChange = React.useCallback((state: any) => {
    if (state === 'ended') {
      Toast('Video has finished playing.')
    }
  }, [])

  return (
    <MainLayout user={user} >
      <ScrollView
        style={tw`w-full`}
        keyboardShouldPersistTaps="handled"
      >
        {dishIsLoading && (
          <ViewDishSkeletonLoader />
        )}
        {!dishIsLoading && (
          <React.Fragment>
            <View style={tw`relative flex flex-col items-start justify-start w-full px-5 py-5`}>
              <View style={tw`flex flex-col items-center w-full`}>
                <Text style={[tw`ml-1 text-3xl text-neutral-600`, fonts.fontPoppinsBlack]}>{ dish.title }</Text>
                <Text style={[tw`mt-1 px-2 py-0.5 rounded-full text-sm text-white bg-[#f2b900]`, fonts.fontPoppinsLight]}>{ dish.category }</Text>
                <View style={tw`w-full overflow-hidden rounded-xl my-3`}>
                  <Image
                    style={tw`flex w-full h-[12rem] bg-neutral-100`}
                    resizeMode="cover"
                    source={{
                      uri: `${ dish.image }`
                    }}
                  />
                </View>
              </View>
              <View style={tw`flex-row items-center justify-between w-full px-1`}>
                <View style={tw`mt-3`}>
                  <Text style={[tw`text-lg text-neutral-600`, fonts.fontPoppinsBold]}>{ dish.location }</Text>
                  <Text style={[tw`text-sm text-neutral-500`, fonts.fontPoppins]}>by { dish.author.name }</Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  <View style={tw`flex-row items-center mx-1.5`}>
                    <LikeButton
                      user={user}
                      author={dish.author}
                      slug={slug}
                      likes={dish.likes}
                    />
                    {/* <Text style={[tw`text-base ml-1.5`, fonts.fontPoppins]}>{ dish.likes && dish.likes.length }</Text> */}
                  </View>
                  {(user.id === dish.author.id) && (
                    <React.Fragment>
                      <View style={tw`flex-row items-center mx-1.5`}>
                        <TouchableOpacity
                          onPress={() => {
                            useNavigate('EditDishScreen', {
                              id: dish.id,
                              slug: dish.slug,
                              title: dish.title,
                              image: dish.image,
                              category: dish.category,
                              location: dish.location,
                              description: dish.description,
                              youtube: dish.youtube,
                              ingredients: dish.ingredients,
                              procedures: dish.procedures,
                              author: dish.author
                            })
                          }}
                        >
                          <FeatherIcon
                            name="edit"
                            size="medium"
                            color="#c3c3c3"
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={tw`flex-row items-center mx-1.5`}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                          <MaterialIcon
                            name="trash"
                            size="medium"
                            color="#c3c3c3"
                          />
                        </TouchableOpacity>
                      </View>
                    </React.Fragment>
                  )}
                </View>
              </View>
              <View style={tw`flex flex-col items-center w-full pb-5`}>
                <Text style={[tw`mt-3 text-base text-left text-neutral-600`, fonts.fontPoppins]}>{ dish.description }</Text>
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
                    <Text style={[tw`w-[15rem] ml-2 text-base text-neutral-600`, fonts.fontPoppins]}>{ ingredient.name }</Text>
                  </View>
                ))}
              </View>
              <View style={tw`flex flex-col items-start w-full mt-5 overflow-hidden`}>
                <Text style={[tw`text-xl text-center text-neutral-500 uppercase`, fonts.fontPoppinsBold]}>Procedures</Text>
                {dish.procedures.map((procedure: { details: string }, i: number) => (
                  <View key={i} style={tw`flex flex-row items-start mt-2`}>
                    <Text style={[tw`text-base text-[#f2b900]`, fonts.fontPoppinsBold]}>Step {i + 1}: </Text>
                    <Text style={[tw`w-[15rem] ml-1 text-base text-neutral-600`, fonts.fontPoppins]}>{ procedure.details }</Text>
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
            <DishComments
              user={user}
              author={dish.author}
              slug={slug}
            />
            <View style={tw`flex flex-row items-center justify-center w-full py-3`}>
              <Text style={[tw`text-xs text-neutral-400`, fonts.fontPoppinsLight]}>
                &copy; 2022 Rekados. All rights reserved.
              </Text>
            </View>
            <DeleteDish
              title={dish.title}
              slug={slug}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            />
          </React.Fragment>
        )}
      </ScrollView>
    </MainLayout>
  )
}

export default DisplayDishScreen