import React from 'react'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { SafeAreaView, View, Modal, Text, Image, ActivityIndicator } from 'react-native'

interface TypedProps {
  message: string
  isVisible: boolean
}

const CreateEditSplashScreen: React.FC<TypedProps> = ({ message, isVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <SafeAreaView style={tw`flex-1 flex-col items-center justify-center w-full h-full bg-white dark:bg-[#262626]`}>
        <View style={tw`flex-col items-center w-full`}>
          <View style={tw`flex-row justify-center w-full overflow-hidden rounded-xl`}>
            <Image
              style={tw`w-[10rem] h-[3rem]`}
              resizeMode="contain"
              source={require('../../assets/images/favicon2.png')}
            />
          </View>
          <Text style={[tw`text-base text-[#676767] dark:text-neutral-400 -mt-1 mr-1`, fonts.fontPoppinsLight]}>Your daily recipe at a glance</Text>
        </View>
        <View style={tw`my-3`}>
          <ActivityIndicator
            color='#F3B900'
            size={50}
          />
        </View>
        <View style={tw`my-3`}>
          <Text style={[tw`text-base text-neutral-600 dark:text-neutral-400 uppercase`, fonts.fontPoppinsBold]}>{ message }</Text>
          <Text style={[tw`text-base text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Just wait for a while...</Text>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default CreateEditSplashScreen