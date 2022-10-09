import React from 'react'
import DishCard from '../../components/Cards/DishCard'
import NewsFeedSkeletonLoader from '../../components/SkeletonLoaders/NewsFeedSkeletonLoader'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { View, Text, TextInput, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import { useGetSaveDishes } from '../../lib/ReactQuery'

interface TypedProps {
  user: Object
}

const SaveDishLayout: React.FC<TypedProps> = ({ user }) => {

  const {
    data: saveDishes,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }: any = useGetSaveDishes()

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
          <Text style={[tw`text-2xl text-neutral-600`, fonts.fontPoppinsBold]}>Saved Dishes</Text>
          <Text style={[tw`text-sm text-neutral-400`, fonts.fontPoppinsLight]}>Your saved dishes list.</Text>
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
    return (
      <View style={tw`flex px-3`}>
        <DishCard
          user={user}
          dish={item}
        />
      </View>
    )
  }

  return (
    <View style={tw`flex flex-col w-full`}>
      {isLoading && (
        <ScrollView contentContainerStyle={tw`px-3`}>
          <NewsFeedSkeletonLoader />
        </ScrollView>
      )}
      {!isLoading && (
        <FlatList
          ListHeaderComponent={headerComponent}
          data={saveDishes.pages.map((page: any) => page.saveDish).flat()}
          renderItem={renderData}
          keyExtractor={itemKeyExtractor}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={isFetchingNextPage ? renderSpinner : null}
        />
      )}
    </View>
  )
}

export default SaveDishLayout