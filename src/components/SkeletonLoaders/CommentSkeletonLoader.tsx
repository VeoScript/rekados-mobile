import React from 'react'
import tw from 'twrnc'
import { View, Text } from 'react-native'

const CommentSkeletonLoader = () => {
  let skeletonCount = [1, 2, 3]
  return (
    <React.Fragment>
      {skeletonCount.map((count: number) => (
        <View key={count} style={tw`flex-row items-start w-full`}>
          <View style={tw`overflow-hidden rounded-full my-3 p-5 bg-neutral-100 dark:bg-[#676767]`} />
          <View style={tw`flex-1 flex-col mx-3 my-3`}>
            <Text style={tw`h-[16px] my-0.5 rounded-full bg-neutral-100 dark:bg-[#676767]`} />
            <Text style={tw`h-[10px] my-0.5 rounded-full bg-neutral-100 dark:bg-[#676767]`} />
            <Text style={tw`w-[10rem] h-[10px] my-0.5 rounded-full bg-neutral-100 dark:bg-[#676767]`} />
          </View>
        </View>
      ))}
    </React.Fragment>
  )
}

export default CommentSkeletonLoader