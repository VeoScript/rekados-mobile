import React from 'react'
import VerifyModal from '../../components/Modals/ForgotPassword/VerifyModal'
import ResetPasswordModal from '../../components/Modals/ForgotPassword/ResetPasswordModal'
import emailJS from '@emailjs/browser'
import jwt_decode from 'jwt-decode'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { FeatherIcon, MaterialIcon } from '../../utils/Icons'
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useForgotPasswordMutation } from '../../lib/ReactQuery'
import { JWT_SECRET, EMAILJS_PUBLIC_KEY, EMAILJS_TEMPLATE_ID, EMAILJS_SERVICE_ID } from '@env'

const ForgotPasswordScreen = () => {

  const forgotPasswordMutation = useForgotPasswordMutation()

  const [code, setCode] = React.useState<string>('')
  const [verifiedUserId, setVerifiedUserId] = React.useState<string>('')

  const [verifyModalVisible, setVerifyModalVisible] = React.useState<boolean>(false)
  const [resetPasswordModalVisible, setResetPasswordModalVisible] = React.useState<boolean>(false)

  const [isLoading, setIsLoading] = React.useState<Boolean>(false)

  const [email, setEmail] = React.useState<string>('')
  const [emailError, setEmailError] = React.useState<string>('')

  const [forgotPasswordError, setForgotPasswordError] = React.useState<string>('')

  const onSendCode = async () => {
    if (email === '') {
      setEmailError('Email is required.')
    } else {
      clearErrorState()
      setIsLoading(true)
      await forgotPasswordMutation.mutateAsync({
        email: email
      },{
        onError: (error: any) => {
          setForgotPasswordError(error.response?.data?.message)
          clearFormState()
          clearErrorState()
          setIsLoading(false)
        },
        onSuccess: async (res) => {
          const name = res?.data?.name
          const mailMessage = res?.data?.mailMessage
          const secret = JWT_SECRET
          const reset_code = res?.data?.reset_code + secret
          const verifyToken: any = await jwt_decode(reset_code)
          
          //check if there is verified token from api
          if (verifyToken) {
            const getUserID = verifyToken.userId // kuhaon nija ang user id gikan sa api pinaagi sa decoded na verified token
            const verificationCode = Math.random().toString(36).slice(-6)

            const mail = await emailJS.send(
              EMAILJS_SERVICE_ID,
              EMAILJS_TEMPLATE_ID,
              { name, email, mailMessage, verificationCode },
              EMAILJS_PUBLIC_KEY
            )
  
            if (mail) {
              setCode(verificationCode)
              setVerifiedUserId(getUserID)
              setVerifyModalVisible(true)
              setForgotPasswordError('')
            } else {
              setCode('')
              setForgotPasswordError('There is a problem sending mail.')
            }
          }

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
  }

  const clearErrorState = () => {
    setEmailError('')
  }

  return (
    <SafeAreaView style={tw`flex-1 flex-col items-center justify-center w-full bg-white dark:bg-[#262626]`}>
      <ScrollView contentContainerStyle={tw`flex-1`} keyboardShouldPersistTaps="handled">
        <View style={tw`flex-1 flex-col items-center justify-center w-full h-full p-5`}>
          <View style={tw`my-5`}>
            <FeatherIcon
              name="lock"
              size="ultraLarge"
              color="#f2b900"
            />
          </View>
          <View style={tw`flex-col items-center w-full`}>
            <Text style={[tw`text-2xl text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsBold]}>Forgot Password</Text>
            <Text style={[tw`text-center text-base text-neutral-500 dark:text-neutral-400 mt-2`, fonts.fontPoppins]}>Enter the email associated with your account and we'll send an email with instructions to reset your password.</Text>
          </View>
          {forgotPasswordError && (
            <View style={tw`flex flex-row items-center w-full my-3 px-5 py-3 overflow-hidden rounded-xl bg-red-300`}>
              <MaterialIcon
                name="x-circle-fill"
                size="medium"
                color="#FF7D7D"
              />
              <Text style={[tw`-ml-5 w-full text-center text-sm text-[#FFFFFF]`, fonts.fontPoppinsLight]}>{ forgotPasswordError }</Text>
            </View>
          )}
          <View style={tw`flex-col items-start w-full my-3`}>
            <View style={tw`flex flex-row items-center mx-2 mb-1`}>
              <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Email address</Text>
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
          <View style={tw`flex flex-col w-full`}>
            {isLoading
              ? <View style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900] bg-opacity-70`}>
                  <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Sending...</Text>
                </View>
              : <TouchableOpacity
                  style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900]`}
                  activeOpacity={0.7}
                  onPress={onSendCode}
                >
                  <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Send Code</Text>
                </TouchableOpacity>
            }
          </View>
        </View>
        <VerifyModal
          verificationCode={code}
          setVerificationCode={setCode}      
          modalVisible={verifyModalVisible}
          setModalVisible={setVerifyModalVisible}
          setResetPasswordModalVisible={setResetPasswordModalVisible}
        />
        <ResetPasswordModal
          verifiedUserId={verifiedUserId}
          setVerifiedUserId={setVerifiedUserId}    
          modalVisible={resetPasswordModalVisible}
          setModalVisible={setResetPasswordModalVisible}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen