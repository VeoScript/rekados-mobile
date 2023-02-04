import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import tw from 'twrnc'
import { View, Text } from 'react-native'

const NotificationSkeletonLoader = () => {
  let skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <React.Fragment>
      {skeletonCount.map((count: number) => (
        <SkeletonPlaceholder key={count}>
          <View style={tw`flex-row items-start w-full mb-1 px-2 py-3 rounded-2xl`}>
            <View style={tw`overflow-hidden rounded-full p-5 w-[2.5rem] h-[2.5rem] bg-neutral-200 dark:bg-[#676767]`} />
            <View style={tw`flex-1 flex-col w-full mx-3`}>
              <Text style={tw`w-1/2 h-[10px] my-0.5 rounded-full bg-neutral-200 dark:bg-[#676767]`} />
              <Text style={tw`w-2/3 h-[10px] my-0.5 rounded-full bg-neutral-200 dark:bg-[#676767]`} />
              <Text style={tw`w-full h-[10px] my-0.5 rounded-full bg-neutral-200 dark:bg-[#676767]`} />
              <Text style={tw`w-[5rem] h-[10px] mt-3 rounded-full bg-neutral-200 dark:bg-[#676767]`} />
            </View>
          </View>
        </SkeletonPlaceholder>
      ))}
    </React.Fragment>
  )
}

export default NotificationSkeletonLoader