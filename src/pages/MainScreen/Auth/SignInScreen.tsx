import React from 'react'
import AuthLayout from '../../../layouts/AuthLayout'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { APP_NAME, API_URL } from '@env'
import { View, Text, TextInput, TouchableOpacity, BackHandler, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

interface TypedProps {
  navigation: any
}

const SignInScreen: React.FC<TypedProps> = ({ navigation }) => {

  // Nig click sa users ug back button muback ra jd sija padong sa HomeScreen
  const handleBackToHomeScreen = () => {
    BackHandler.exitApp()
  }

  useFocusEffect(
    React.useCallback(() => {

      const onBackPress = () => {
        handleBackToHomeScreen()
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }, [handleBackToHomeScreen])
  )

  return (
    <AuthLayout navigation={navigation}>
      <View style={tw`flex flex-row justify-center w-full my-3 overflow-hidden rounded-xl`}>
        <Text style={[tw`text-xl text-[#414143]`, fonts.fontPoppinsBold]}>Sign in</Text>
      </View>
      <View style={tw`flex flex-col my-1 w-full`}>
        <View style={tw`flex flex-row items-center mx-2 mb-1`}>
          <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Email</Text>
        </View>
        <TextInput
          style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
        />
      </View>
      <View style={tw`flex flex-col my-1 w-full`}>
        <View style={tw`flex flex-row items-center mx-2 mb-1`}>
          <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Password</Text>
        </View>
        <TextInput
          style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
          secureTextEntry={true}
        />
      </View>
      <View style={tw`flex flex-col w-full my-1`}>
        <TouchableOpacity
          style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900]`}
          activeOpacity={0.7}
          onPress={() => {
            navigation.push('HomeScreen')
          }}
        >
          <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`flex flex-row items-center justify-center w-full mt-5`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            console.log('You pressed forgot password navigation.')
          }}
        >
          <Text style={[tw`text-sm text-neutral-500`, fonts.fontPoppinsLight]}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  )
}

export default SignInScreen