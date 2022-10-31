import React from 'react'
import TopHeader from '../../components/TopHeader'
import DishCard from '../../components/Cards/DishCard'
import NewsFeedSkeletonLoader from '../../components/SkeletonLoaders/NewsFeedSkeletonLoader'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { View, FlatList, ActivityIndicator, ScrollView, Text } from 'react-native'
import { useGetDishes } from '../../lib/ReactQuery'

interface TypedProps {
  user: Object | any
}

const FeedLayout: React.FC<TypedProps> = ({ user }) => {
  
  const {
    data: dishes,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }: any = useGetDishes(user.id)

  const itemKeyExtractor = (item: any, index: { toString: () => any }) => {
    return index.toString()
  }

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const renderSpinner = () => {
    return <ActivityIndicator style={tw`pb-3`} color='#F3B900' size={40} />
  }

  const headerComponent = () => {
    return (
      <TopHeader
        title="Feed"
        subtitle="Browse dishes around the world."
      />
    )
  }

  const listIsEmpty = () => {
    return (
      <View style={tw`flex-1 flex-col items-center justify-center w-full h-full my-3`}>
        <View style={tw`flex-1 w-full max-w-xs h-full`}>
          <Text style={[tw`text-3xl text-neutral-500`, fonts.fontPoppins]}>Newsfeed is empty.</Text>
          <Text style={[tw`my-2 text-lg text-neutral-400`, fonts.fontPoppins]}>Create your first dish.</Text>
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
        <ScrollView>
          <TopHeader
            title="Feed"
            subtitle="Browse dishes around the world."
          />
          <View style={tw`px-3`}>
            <NewsFeedSkeletonLoader />
          </View>
        </ScrollView>
      )}
      {!isLoading && (
        <FlatList
          ListHeaderComponent={headerComponent}
          ListEmptyComponent={listIsEmpty}
          data={dishes.pages.map((page: any) => page.dishes).flat()}
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

export default FeedLayout