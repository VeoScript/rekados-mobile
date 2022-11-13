import React from 'react'
import tw from 'twrnc'
import { View, Text } from 'react-native'

const SearchResultsLoader = () => {
  let skeletonCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <React.Fragment>
      {skeletonCount.map((count: number) => (
        <View key={count} style={tw`flex-row items-start w-full mb-3`}>
          <View style={tw`overflow-hidden rounded-full p-5 w-[3rem] h-[3rem] bg-neutral-200 dark:bg-[#676767]`} />
          <View style={tw`flex-1 flex-col w-full mx-3`}>
            <Text style={tw`w-[8rem] h-[16px] my-0.5 rounded-full bg-neutral-200 dark:bg-[#676767]`} />
            <Text style={tw`w-full h-[10px] my-0.5 rounded-full bg-neutral-200 dark:bg-[#676767]`} />
          </View>
        </View>
      ))}
    </React.Fragment>
  )
}

export default SearchResultsLoader