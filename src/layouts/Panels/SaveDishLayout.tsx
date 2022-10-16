import React from 'react'
import TopHeader from '../../components/TopHeader'
import DishCard from '../../components/Cards/DishCard'
import NewsFeedSkeletonLoader from '../../components/SkeletonLoaders/NewsFeedSkeletonLoader'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { View, FlatList, ActivityIndicator, ScrollView } from 'react-native'
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
      <TopHeader
        title="Saved Dishes"
        subtitle="Your saved dishes list."
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
        <React.Fragment>
          <TopHeader
            title="Saved Dishes"
            subtitle="Your saved dishes list."
          />
          <ScrollView contentContainerStyle={tw`px-3`}>
            <NewsFeedSkeletonLoader />
          </ScrollView>
        </React.Fragment>
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