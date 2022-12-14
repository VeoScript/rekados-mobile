import React from 'react'
import AuthLayout from '../../../layouts/AuthLayout'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { MaterialIcon } from '../../../utils/Icons'
import { View, Text, TextInput, TouchableOpacity, BackHandler } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useLoginMutation } from '../../../lib/ReactQuery'
import { useNavigate } from '../../../utils/RootNavigation'

const SignInScreen = () => {

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

  const loginMutation = useLoginMutation()

  // loading state
  const [isLoading, setIsLoading] = React.useState<Boolean>(false)

  // form state
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  // validation state
  const [emailError, setEmailError] = React.useState<string>('')
  const [passwordError, setPasswordError] = React.useState<string>('')
  const [loginError, setLoginError] = React.useState<string>('')

  const onSignIn = async () => {
    if (email === '') {
      setEmailError('Email is required.')
    } else if (password === '') {
      setPasswordError('Password is required.')
    } else {
      clearErrorState()
      setIsLoading(true)
      await loginMutation.mutateAsync({
        email: email,
        password: password
      },{
        onError: (error: any) => {
          setLoginError(error.response?.data?.message)
          clearFormState()
          clearErrorState()
          setIsLoading(false)
        },
        onSuccess: () => {
          setLoginError('')
          clearFormState()
          clearErrorState()
          setIsLoading(false)
        }
      })
    }
  }

  const validateEmail = (text: string) => {
    let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

    if (regex.test(text) === false) {
      setEmailError('Email is invalid.')
      setEmail(text)
      return false
    } else {
      setEmail(text)
      clearErrorState()
    }
  }

  const clearFormState = () => {
    setEmail('')
    setPassword('')
  }

  const clearErrorState = () => {
    setEmailError('')
    setPasswordError('')
  }

  return (
    <AuthLayout>
      <View style={tw`flex flex-row justify-center w-full my-3 overflow-hidden rounded-xl`}>
        <Text style={[tw`text-xl text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsBold]}>Welcome Back</Text>
      </View>
      {loginError && (
        <View style={tw`flex flex-row items-center w-full my-3 px-5 py-3 overflow-hidden rounded-xl bg-red-300`}>
          <MaterialIcon
            name="x-circle-fill"
            size="medium"
            color="#FF7D7D"
          />
          <Text style={[tw`-ml-5 w-full text-center text-sm text-[#FFFFFF]`, fonts.fontPoppinsLight]}>{ loginError }</Text>
        </View>
      )}
      <View style={tw`flex flex-col my-1 w-full`}>
        <View style={tw`flex flex-row items-center mx-2 mb-1`}>
          <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Email</Text>
        </View>
        <TextInput
          style={[tw`flex w-full px-3 py-2 text-sm text-black dark:text-white rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`, fonts.fontPoppins]}
          editable={!isLoading}
          value={email}
          onChangeText={(text: string) => {
            validateEmail(text)
          }}
        />
        {emailError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ emailError }</Text>}
      </View>
      <View style={tw`flex flex-col my-1 w-full`}>
        <View style={tw`flex flex-row items-center mx-2 mb-1`}>
          <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Password</Text>
        </View>
        <TextInput
          style={[tw`flex w-full px-3 py-2 text-sm text-black dark:text-white rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`, fonts.fontPoppins]}
          editable={!isLoading}
          secureTextEntry={true}
          value={password}
          onChangeText={(text: string) => {
            setPassword(text)
            clearErrorState()
          }}
        />
        {passwordError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ passwordError }</Text>}
      </View>
      <View style={tw`flex flex-col w-full my-1`}>
        {isLoading
          ? <View style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900] bg-opacity-70`}>
              <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Loading...</Text>
            </View>
          : <TouchableOpacity
              style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900]`}
              activeOpacity={0.7}
              onPress={onSignIn}
            >
              <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Sign In</Text>
            </TouchableOpacity>
        }
      </View>
      <View style={tw`flex flex-row items-center justify-center w-full mt-5`}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            useNavigate('ForgotPasswordScreen')
          }}
        >
          <Text style={[tw`text-sm text-neutral-500 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
    </AuthLayout>
  )
}

export default SignInScreen