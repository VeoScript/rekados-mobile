import React from 'react'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { MaterialIcon } from '../../utils/Icons'
import { SafeAreaView, View, Text, Image, ActivityIndicator } from 'react-native'

interface ErrorScreenTypes {
  error: string
}

const ErrorScreen: React.FC<ErrorScreenTypes> = ({ error }) => {
  return (
    <SafeAreaView style={tw`flex-1 flex-col items-center justify-center w-full bg-white`}>
      <View style={tw`flex-col items-center w-full`}>
        <View style={tw`flex-row justify-center w-full overflow-hidden rounded-xl`}>
          <Image
            style={tw`w-[6rem] h-[6rem]`}
            resizeMode="contain"
            source={require('../../assets/images/favicon2.png')}
          />
        </View>
        <Text style={[tw`text-base text-[#676767] -mt-1 mr-1`, fonts.fontPoppinsLight]}>Your daily recipe at a glance</Text>
      </View>
      <View style={tw`flex-col items-center justify-center w-full my-10`}>
        <MaterialIcon
          name="stop"
          size="extraLarge"
          color="#FF2828"
        />
        <View style={tw`my-3`}>
          <Text style={[tw`text-center text-base text-[#414143]`, fonts.fontPoppins]}>{ error ? error : 'Opps! There is an error.' }</Text>
          {!error && <Text style={[tw`text-center text-base text-[#414143]`, fonts.fontPoppins]}>We're trying to fix this ASAP.</Text>}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ErrorScreen