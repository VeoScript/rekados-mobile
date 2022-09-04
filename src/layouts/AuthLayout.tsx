import React from 'react'
import tw from 'twrnc'
import { fonts } from '../styles/global'
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { useRoute } from '@react-navigation/native'

interface TypedProps {
  children: any
  navigation: any
}

const AuthLayout: React.FC<TypedProps> = ({ children, navigation }) => {

  const route = useRoute()

  return (
    <ScrollView contentContainerStyle={tw`flex flex-col items-center justify-center w-full h-full bg-white`}>
      <SafeAreaView style={tw`flex flex-col items-center justify-center px-5 py-10 w-full h-full`}>
        {route.name === 'SignInScreen'
          ? (
              <View style={tw`flex flex-col items-center w-full`}>
                <View style={tw`flex flex-row items-center justify-center`}>
                  <Text style={[tw`text-lg text-[#222222] mr-1`, fonts.fontPoppins]}>Sign in to</Text>
                  <Text style={[tw`text-2xl text-[#f2b900]`, fonts.fontPoppinsBlack]}>REKADOS</Text>
                </View>
                <Text style={[tw`text-sm text-[#33333] mr-1`, fonts.fontPoppinsLight]}>Your daily recipe at a glance</Text>
              </View>
            )
          : (
              <View style={tw`flex flex-col items-center w-full`}>
                <View style={tw`flex flex-col items-center justify-center`}>
                  <Text style={[tw`text-2xl text-[#f2b900]`, fonts.fontPoppinsBlack]}>REKADOS</Text>
                  <Text style={[tw`text-base text-[#222222] mr-1`, fonts.fontPoppins]}>Create Account</Text>
                </View>
                <Text style={[tw`text-sm text-[#33333] mr-1`, fonts.fontPoppinsLight]}>Share your recipe around the globe</Text>
              </View>
            )
        }
        <View style={tw`flex flex-col items-center w-full py-5`}>
          {children}
        </View>
        <View style={tw`flex flex-col items-center w-full`}>
          {route.name === 'SignUpScreen' && (
            <Text style={[tw`text-xs text-neutral-500 mb-2`, fonts.fontPoppins]}>Have already an account?</Text>
          )}
          <TouchableOpacity
            style={tw`flex flex-col items-center w-full px-3 py-3 rounded-xl border border-neutral-200 bg-white`}
            activeOpacity={0.7}
            onPress={() => {
              if (route.name === 'SignInScreen') {
                navigation.navigate('SignUpScreen')
              } else {
                navigation.navigate('SignInScreen')
              }
            }}
          >
            <Text style={[tw`text-sm text-neutral-500`, fonts.fontPoppinsSemiBold]}>
              {`${ route.name === 'SignInScreen' ? 'Create Account' : 'Sign In' }`}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default AuthLayout