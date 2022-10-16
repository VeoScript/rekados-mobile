import React from 'react'
import TopHeader from '../../components/TopHeader'
import DishCard from '../../components/Cards/DishCard'
import NewsFeedSkeletonLoader from '../../components/SkeletonLoaders/NewsFeedSkeletonLoader'
import tw from 'twrnc'
import { View, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import { useGetDishes } from '../../lib/ReactQuery'

interface TypedProps {
  user: Object
}

const FeedLayout: React.FC<TypedProps> = ({ user }) => {
  
  const {
    data: dishes,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }: any = useGetDishes()

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
      <TopHeader
        title="Feed"
        subtitle="Browse dishes around the world."
      />
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
          <TopHeader
            title="Feed"
            subtitle="Browse dishes around the world."
          />
          <NewsFeedSkeletonLoader />
        </ScrollView>
      )}
      {!isLoading && (
        <FlatList
          ListHeaderComponent={headerComponent}
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