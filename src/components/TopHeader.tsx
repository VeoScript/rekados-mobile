import React from 'react'
import tw from 'twrnc'
import { fonts } from '../styles/global'
import { FeatherIcon } from '../utils/Icons'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigate } from '../utils/RootNavigation'
import { useRoute } from '@react-navigation/native'

interface TypedProps {
  title: string
  subtitle: string
}

const TopHeader: React.FC<TypedProps> = ({ title, subtitle }) => {

  const route = useRoute()

  return (
    <View style={tw`flex flex-row items-center justify-between w-full p-3`}>
      <View style={tw`flex flex-col px-1 py-3`}>
        <Text style={[tw`text-2xl text-neutral-600`, fonts.fontPoppinsBold]}>{ title }</Text>
        <Text style={[tw`text-sm text-neutral-400`, fonts.fontPoppinsLight]}>{ subtitle }</Text>
      </View>
      {(route.name !== 'SearchScreen' && route.name !== 'UserSettingScreen' && route.name !== 'NotificationScreen') && (
        <TouchableOpacity
          style={tw`p-2 rounded-full`}
          onPress={() => {
            useNavigate('SearchScreen')
          }}
        >
          <FeatherIcon
            name="search"
            size="large"
            color="#7c7c7c"
          />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default TopHeader