import React from 'react'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { FeatherIcon } from '../../../utils/Icons'
import { Toast } from '../../../utils/Toast'
import { ScrollView, View, Modal, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useResetPasswordMutation } from '../../../lib/ReactQuery'

interface TypedProps {
  verifiedUserId: string
  setVerifiedUserId: any
  modalVisible: any
  setModalVisible: any
}

const ResetPasswordModal: React.FC<TypedProps> = ({
    verifiedUserId,
    setVerifiedUserId,
    modalVisible,
    setModalVisible
}) => {

  const resetPasswordMutation = useResetPasswordMutation()

  const [isLoading, setIsLoading] = React.useState<Boolean>(false)

  const [password, setPassword] = React.useState<string>('')
  const [repassword, setRepassword] = React.useState<string>('')
  const [passwordError, setPasswordError] = React.useState<string>('')
  const [repasswordError, setRepasswordError] = React.useState<string>('')

  const onResetPassword = async () => {
    if (password === '') {
      setPasswordError('Password is required')
    } else if (repassword === '') {
      setRepasswordError('Re-enter password is required')
    } else if (password !== repassword) {
      setRepasswordError('Password did not match, try again.')
    } else {
      setIsLoading(true)
      await resetPasswordMutation.mutateAsync({
        userId: verifiedUserId,
        newpassword: password
      },
      {
        onError: () => {
          Toast('There is an error.')
          setIsLoading(false)
        },
        onSuccess: () => {
          setVerifiedUserId('')
          Toast('Reset Password Successfully')
          setIsLoading(false)
        }
      })
      clearAll()
    }
  }

  const clearAll = () => {
    setPasswordError('')
    setRepasswordError('')
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}      
    >
      <ScrollView contentContainerStyle={tw`flex-1 w-full bg-white`} keyboardShouldPersistTaps="handled">
        <View style={tw`flex-col items-center w-full h-full p-5`}>
          <View style={tw`flex-col items-center justify-center w-full h-full`}>
            <View>
              <FeatherIcon
                name="key"
                size="ultraLarge"
                color="#f2b900"
              />
            </View>
            <View style={tw`flex-col items-center w-full my-5`}>
              <View style={tw`mb-5`}>
                <Text style={[tw`text-2xl text-neutral-600`, fonts.fontPoppinsBold]}>Change Password</Text>
                <Text style={[tw`my-1 text-center text-base text-neutral-500`, fonts.fontPoppins]}>
                  Secure your account
                </Text>
              </View>
              <View style={tw`flex-col items-start w-full`}>
                <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                  <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>New Password</Text>
                </View>
                <TextInput
                  style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                  editable={!isLoading}
                  value={password}
                  secureTextEntry={true}
                  onChangeText={(text: string) => {
                    setPassword(text)
                    setPasswordError('')
                  }}
                />
                {passwordError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ passwordError }</Text>}
              </View>
              <View style={tw`flex-col items-start w-full my-3`}>
                <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                  <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Re-enter Password</Text>
                </View>
                <TextInput
                  style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                  editable={!isLoading}
                  value={repassword}
                  secureTextEntry={true}
                  onChangeText={(text: string) => {
                    setRepassword(text)
                    setRepasswordError('')
                  }}
                />
                {repasswordError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ repasswordError }</Text>}
              </View>
              <View style={tw`flex flex-col w-full`}>
                {isLoading
                  ? <View style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900] bg-opacity-70`}>
                      <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Loading...</Text>
                    </View>
                  : <TouchableOpacity
                      style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900]`}
                      activeOpacity={0.7}
                      onPress={onResetPassword}
                    >
                      <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Change Password</Text>
                    </TouchableOpacity>
                }
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  )
}

export default ResetPasswordModal