import React from 'react'
import TopHeader from '../../components/TopHeader'
import DishCard from '../../components/Cards/DishCard'
import NewsFeedSkeletonLoader from '../../components/SkeletonLoaders/NewsFeedSkeletonLoader'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native'
import { useGetSaveDishes } from '../../lib/ReactQuery'

interface TypedProps {
  user: {
    id: string
  }
}

const SaveDishLayout: React.FC<TypedProps> = ({ user }) => {

  const {
    data: saveDishes,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  }: any = useGetSaveDishes(user.id)

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

  const listIsEmpty = () => {
    return (
      <View style={tw`flex-1 flex-col items-center justify-center w-full h-full my-5`}>
        <View style={tw`flex-1 w-full max-w-xs h-full`}>
          <Text style={[tw`text-3xl text-neutral-500`, fonts.fontPoppins]}>You don't have saved dishes yet.</Text>
          <Text style={[tw`text-lg text-neutral-400`, fonts.fontPoppins]}>When you do, your saved dishes will shown up here.</Text>
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
            title="Saved Dishes"
            subtitle="Your saved dishes list."
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