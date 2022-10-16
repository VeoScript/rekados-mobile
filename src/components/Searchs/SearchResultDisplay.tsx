import React from 'react'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { Toast } from '../../utils/Toast'
import { TouchableOpacity, Image, View, Text } from 'react-native'

interface TypedProps {
  image: string
  title: string
  description: string
}

const SearchResultDisplay: React.FC<TypedProps> = ({ image, title, description }) => {
  return (
    <TouchableOpacity
      style={tw`flex-row items-start w-full mb-3`}
      onPress={() => {
        Toast('You pressed recent history.')
      }}
    >
      <Image
        style={tw`flex rounded-xl w-[3rem] h-[3rem]`}
        resizeMode="cover"
        source={{
          uri: `${ image }`
        }}
      />
      <View style={tw`flex-1 flex-col w-full mx-3`}>
        <Text style={[tw`text-lg text-neutral-600`, fonts.fontPoppinsBold]}>{ title }</Text>
        <Text
          ellipsizeMode='tail'
          numberOfLines={3}
          style={[tw`text-sm text-neutral-500`, fonts.fontPoppinsLight]}
        >
          { description }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default SearchResultDisplay