import React from 'react'
import AuthLayout from '../../../layouts/AuthLayout'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useRegisterMutation } from '../../../lib/ReactQuery'

const SignUpScreen = () => {
  // loading state
  const [isLoading, setIsLoading] = React.useState<Boolean>(false)

  // form state
  const [name, setName] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [username, setUsername] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [repassword, setRepassword] = React.useState<string>('')

  // validation state
  const [nameError, setNameError] = React.useState<string>('')
  const [emailError, setEmailError] = React.useState<string>('')
  const [usernameError, setUsernameError] = React.useState<string>('')
  const [passwordError, setPasswordError] = React.useState<string>('')
  const [repasswordError, setRepasswordError] = React.useState<string>('')

  const registrationMutation = useRegisterMutation()

  const onSignUp = async () => {
    if (name === '') {
      setNameError('Name is required.')
    } else if (email === '') {
      setEmailError('Email is required.')
    } else if (username === '') {
      setUsernameError('Username is required.')
    } else if (password === '' || repassword === '') {
      setPasswordError('Password is required.')
      setRepasswordError('Re-enter password is required.')
    } else {
      if (password !== repassword) {
        setRepasswordError('Password did not match! Try again.')
      } else {
        clearErrorState()
        setIsLoading(true)
        await registrationMutation.mutateAsync({
          email: email,
          name: name,
          password: password
        },{
          onError: (error) => {
            console.error(error),
            clearFormState()
            clearErrorState()
            setIsLoading(false)
          },
          onSuccess: () => {
            clearFormState()
            clearErrorState()
            setIsLoading(false)
          }
        })
      }
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
    setName('')
    setEmail('')
    setUsername('')
    setPassword('')
  }

  const clearErrorState = () => {
    setNameError('')
    setEmailError('')
    setUsernameError('')
    setPasswordError('')
    setRepasswordError('')
  }

  return (
    <AuthLayout>
      <View style={tw`flex flex-col my-1 w-full`}>
        <View style={tw`flex flex-row items-center mx-2 mb-1`}>
          <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Name</Text>
        </View>
        <TextInput
          style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
          editable={!isLoading}
          value={name}
          onChangeText={(text: string) => {
            setName(text)
            clearErrorState()
          }}
        />
        {nameError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ nameError }</Text>}
      </View>
      <View style={tw`flex flex-col my-1 w-full`}>
        <View style={tw`flex flex-row items-center mx-2 mb-1`}>
          <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Email</Text>
        </View>
        <TextInput
          style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
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
          <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Username</Text>
        </View>
        <TextInput
          style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
          editable={!isLoading}
          value={username}
          onChangeText={(text: string) => {
            setUsername(text)
            clearErrorState()
          }}
        />
        {usernameError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ usernameError }</Text>}
      </View>
      <View style={tw`flex flex-col my-1 w-full`}>
        <View style={tw`flex flex-row items-center mx-2 mb-1`}>
          <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Password</Text>
        </View>
        <TextInput
          style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
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
      <View style={tw`flex flex-col my-1 w-full`}>
        <View style={tw`flex flex-row items-center mx-2 mb-1`}>
          <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Re-enter Password</Text>
        </View>
        <TextInput
          style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
          editable={!isLoading}
          secureTextEntry={true}
          value={repassword}
          onChangeText={(text: string) => {
            setRepassword(text)
            clearErrorState()
          }}
        />
        {repasswordError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ repasswordError }</Text>}
      </View>
      <View style={tw`flex flex-col w-full my-1`}>
        {isLoading
          ? <View style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900] bg-opacity-50`}>
              <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Loading...</Text>
            </View>
          : <TouchableOpacity
              style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900]`}
              activeOpacity={0.7}
              onPress={onSignUp}
            >
              <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Sign Up</Text>
            </TouchableOpacity>
        }
      </View>
    </AuthLayout>
  )
}

export default SignUpScreen