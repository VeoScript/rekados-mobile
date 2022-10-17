import React from 'react'
import tw from 'twrnc'
import { View, Text } from 'react-native'

const ProfileSkeletonLoader = () => {
  return (
    <View style={tw`flex-1 flex-col items-center w-full h-full py-3 bg-white`}>
      <View style={tw`flex rounded-full w-[10rem] h-[10rem] my-3 bg-neutral-100`} />
      <View style={tw`flex-col items-center w-full max-w-md px-3 py-3`}>
        <Text style={tw`w-[20rem] h-[16px] my-0.5 rounded-full bg-neutral-100`} />
        <Text style={tw`w-[10rem] h-[10px] my-0.5 rounded-full bg-neutral-100`} />
      </View>
      <View style={tw`flex-row items-center w-full max-w-md py-3`}>
        <Text style={tw`flex-1 w-full h-[4rem] my-0.5 bg-neutral-100 border-r border-white`} />
        <Text style={tw`flex-1 w-full h-[4rem] my-0.5 bg-neutral-100`} />
      </View>
      <View style={tw`flex-col w-full px-3 py-3`}>
        <Text style={tw`h-[16px] my-0.5 rounded-full bg-neutral-100`} />
        <Text style={tw`w-[10rem] h-[10px] my-0.5 rounded-full bg-neutral-100`} />
      </View>
      <View style={tw`flex-col w-full px-3 py-3`}>
        <Text style={tw`h-[16px] my-0.5 rounded-full bg-neutral-100`} />
        <Text style={tw`w-[10rem] h-[10px] my-0.5 rounded-full bg-neutral-100`} />
      </View>
      <View style={tw`flex-col w-full px-3 py-3`}>
        <Text style={tw`h-[16px] my-0.5 rounded-full bg-neutral-100`} />
        <Text style={tw`w-[10rem] h-[10px] my-0.5 rounded-full bg-neutral-100`} />
      </View>
    </View>
  )
}

export default ProfileSkeletonLoader