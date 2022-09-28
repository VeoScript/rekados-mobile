import React from 'react'
import SplashScreen from '../Misc/SplashScreen'
import DishCard from '../../components/Cards/DishCard'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { SafeAreaView, View, Text, TextInput, FlatList, ActivityIndicator } from 'react-native'
import { useGetDishes } from '../../lib/ReactQuery'

const FeedLayout = () => {
  
  const {
    data: dishes,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }: any = useGetDishes()

  if (isLoading) return <SplashScreen />

  const itemKeyExtractor = (item: any, index: { toString: () => any }) => {
    return index.toString()
  }

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const renderSpinner = () => {
    return <ActivityIndicator color='#F3B900' size={40} />
  }

  const headerComponent = () => {
    return (
      <View style={tw`flex flex-col w-full p-3`}>
        <View style={tw`flex flex-col px-1 py-3`}>
          <Text style={[tw`text-2xl text-neutral-600`, fonts.fontPoppinsBold]}>Feed</Text>
          <Text style={[tw`text-sm text-neutral-400`, fonts.fontPoppinsLight]}>Browse dishes around the world.</Text>
        </View>
        <View style={tw`flex flex-col items-start justify-center w-full py-2`}>
          <TextInput
            style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
            placeholder="Search Dish"
          />
        </View>
      </View>
    )
  }

  const renderData = (item: any) => {
    return (<DishCard dish={item} />)
  }

  return (
    <View style={tw`flex flex-col w-full`}>
      <FlatList
        ListHeaderComponent={headerComponent}
        data={dishes.pages.map((page: any) => page.dishes).flat()}
        renderItem={renderData}
        keyExtractor={itemKeyExtractor}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
      />
    </View>
  )
}

export default FeedLayout