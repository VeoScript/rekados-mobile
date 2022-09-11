import React from 'react'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { SafeAreaView, View, Text, Image, ActivityIndicator } from 'react-native'

const SplashScreen = () => {
  return (
    <SafeAreaView style={tw`flex-1 flex-col items-center justify-center w-full bg-white`}>
      <View style={tw`flex-col items-center w-full`}>
        <View style={tw`flex-row justify-center w-full overflow-hidden rounded-xl`}>
          <Image
            style={tw`w-[10rem] h-[3rem]`}
            resizeMode="contain"
            source={require('../../assets/images/favicon2.png')}
          />
        </View>
        <Text style={[tw`text-base text-[#676767] -mt-1 mr-1`, fonts.fontPoppinsLight]}>Your daily recipe at a glance</Text>
      </View>
      <View style={tw`my-3`}>
        <ActivityIndicator
          color='#F3B900'
          size={50}
        />
      </View>
    </SafeAreaView>
  )
}

export default SplashScreen