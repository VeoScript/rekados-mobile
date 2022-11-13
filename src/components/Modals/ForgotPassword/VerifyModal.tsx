import React from 'react'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { FeatherIcon } from '../../../utils/Icons'
import { Toast } from '../../../utils/Toast'
import { ScrollView, View, Modal, Text, TextInput, TouchableOpacity, Alert } from 'react-native'

interface TypedProps {
  verificationCode: string
  setVerificationCode: any
  modalVisible: any
  setModalVisible: any
  setResetPasswordModalVisible: any
}

const VerifyModal: React.FC<TypedProps> = ({
    verificationCode,
    setVerificationCode,
    modalVisible,
    setModalVisible,
    setResetPasswordModalVisible
}) => {

  const [toVerify, setToVerify] = React.useState<string>('')
  const [verifyError, setVerifyError] = React.useState<string>('')

  const onVerify = async () => {
    if (toVerify === '') {
      setVerifyError('Required')
    } else {
      setVerifyError('')

      if (toVerify === verificationCode) {
        Toast('Verified Successfully')
        setVerifyError('')
        setResetPasswordModalVisible(true)
        setModalVisible(false)
      } else {
        setVerifyError('Code not match, try again.')
      }
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
        setVerificationCode('')
      }}      
    >
      <ScrollView contentContainerStyle={tw`flex-1 w-full bg-white dark:bg-[#262626]`} keyboardShouldPersistTaps="handled">
        <View style={tw`flex-col items-center w-full h-full p-5`}>
          <View style={tw`flex-col items-center justify-center w-full h-full`}>
            <View>
              <FeatherIcon
                name="inbox"
                size="ultraLarge"
                color="#f2b900"
              />
            </View>
            <View style={tw`flex-col items-center w-full my-5`}>
              <Text style={[tw`text-2xl text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsBold]}>Check your email</Text>
              <Text style={[tw`my-1 text-center text-base text-neutral-500 dark:text-neutral-400`, fonts.fontPoppins]}>
                Verify your account first.
                We have sent a verfication code to your email.
              </Text>
              <View style={tw`flex-col items-start w-full my-3`}>
                <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                  <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Code</Text>
                </View>
                <TextInput
                  style={[tw`flex w-full px-3 py-2 text-sm text-black dark:text-white rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`, fonts.fontPoppins]}
                  value={toVerify}
                  onChangeText={(text: string) => {
                    setToVerify(text)
                    setVerifyError('')
                  }}
                />
                {verifyError && <Text style={[tw`text-xs text-red-600 mx-2 my-1`, fonts.fontPoppinsLight]}>{ verifyError }</Text>}
              </View>
              <View style={tw`flex flex-col w-full`}>
                <TouchableOpacity
                  style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900]`}
                  activeOpacity={0.7}
                  onPress={onVerify}
                >
                  <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Verify</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw`flex-col items-center w-full`}>
              <Text style={[tw`my-1 text-left text-sm text-neutral-400`, fonts.fontPoppins]}>
                Note: Check your spam folder if you did not received verification code from us.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  )
}

export default VerifyModal