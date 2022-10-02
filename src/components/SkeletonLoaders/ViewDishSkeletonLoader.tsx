import React from 'react'
import tw from 'twrnc'
import { View, Text } from 'react-native'

const ViewDishSkeletonLoader = () => {
  return (
    <View style={tw`flex-1 flex-col w-full h-full px-5 py-5`}>
      <View style={tw`flex-col items-center w-full px-3 py-3`}>
        <Text style={tw`w-[10rem] h-[16px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`w-[15rem] h-[10px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`w-full h-[10px] my-0.5 rounded-full bg-neutral-200`} />
      </View>
      <View style={tw`rounded-xl my-3 bg-neutral-200 w-full h-[10rem] p-5`} />
      <View style={tw`flex-col w-full px-3 py-3`}>
        <Text style={tw`h-[16px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`h-[10px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`w-[10rem] h-[10px] my-0.5 rounded-full bg-neutral-200`} />
      </View>
      <View style={tw`flex-col w-full px-3 py-3`}>
        <Text style={tw`h-[16px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`h-[10px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`w-[10rem] h-[10px] my-0.5 rounded-full bg-neutral-200`} />
      </View>
      <View style={tw`flex-col w-full px-3 py-3`}>
        <Text style={tw`h-[16px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`h-[10px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`w-[10rem] h-[10px] my-0.5 rounded-full bg-neutral-200`} />
      </View>
      <View style={tw`flex-col w-full px-3 py-3`}>
        <Text style={tw`h-[16px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`h-[10px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`w-[10rem] h-[10px] my-0.5 rounded-full bg-neutral-200`} />
      </View>
      <View style={tw`flex-col w-full px-3 py-3`}>
        <Text style={tw`h-[16px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`h-[10px] my-0.5 rounded-full bg-neutral-200`} />
        <Text style={tw`w-[10rem] h-[10px] my-0.5 rounded-full bg-neutral-200`} />
      </View>
    </View>
  )
}

export default ViewDishSkeletonLoader