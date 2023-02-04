import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import tw from 'twrnc'
import { View, Text } from 'react-native'

const NewsFeedSkeletonLoader = () => {
  let skeletonCount = [1, 2, 3]
  return (
    <React.Fragment>
      {skeletonCount.map((count: number) => (
        <SkeletonPlaceholder key={count}>
          <View style={tw`flex-col items-start w-full p-3 my-2 overflow-hidden rounded-xl bg-neutral-100 dark:bg-[#383838]`}>
            <View style={tw`rounded-xl my-3 bg-neutral-200 dark:bg-[#676767] w-full h-[10rem] p-5`} />
            <View style={tw`flex-col w-full px-3 py-3`}>
              <Text style={tw`h-[16px] my-0.5 rounded-full bg-neutral-200 dark:bg-[#676767]`} />
              <Text style={tw`h-[10px] my-0.5 rounded-full bg-neutral-200 dark:bg-[#676767]`} />
              <Text style={tw`w-[10rem] h-[10px] my-0.5 rounded-full bg-neutral-200 dark:bg-[#676767]`} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ))}
    </React.Fragment>
  )
}

export default NewsFeedSkeletonLoader