import React from 'react'
import tw from 'twrnc'
import { fonts } from '../styles/global'
import { FeatherIcon } from '../utils/Icons'
import { Toast } from '../utils/Toast'
import { View, Text, TouchableOpacity } from 'react-native'

interface TypedProps {
  title: string
  subtitle: string
}

const TopHeader: React.FC<TypedProps> = ({ title, subtitle }) => {
  return (
    <View style={tw`flex flex-row items-center justify-between w-full p-3`}>
      <View style={tw`flex flex-col px-1 py-3`}>
        <Text style={[tw`text-2xl text-neutral-600`, fonts.fontPoppinsBold]}>{ title }</Text>
        <Text style={[tw`text-sm text-neutral-400`, fonts.fontPoppinsLight]}>{ subtitle }</Text>
      </View>
      <TouchableOpacity
        style={tw`p-2 bg-neutral-100 rounded-full`}
        onPress={() => {
          Toast('You pressed search button.')
        }}
      >
        <FeatherIcon
          name="search"
          size="large"
          color="#7c7c7c"
        />
      </TouchableOpacity>
    </View>
  )
}

export default TopHeader