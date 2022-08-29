import React from 'react'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { MaterialIcon } from '../../utils/Icons'
import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native'

interface TypedProps {
  modalData: any
  modalVisible: any
  setModalVisible: any
}

const Menu: React.FC<TypedProps> = ({ modalData, modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}      
    >
      <Pressable
        style={tw`absolute inset-0 w-full h-full`}
        onPress={() => {
          setModalVisible(false)
        }}
      />
      <View style={tw`absolute bottom-0 border-t border-neutral-200 flex flex-col w-full bg-white`}>
        <View style={tw`flex flex-row items-center px-5 py-3`}>
          <Text style={[tw`text-xl text-neutral-600`, fonts.fontPoppinsBold]}>Menu</Text>
        </View>
        <View>
          <TouchableOpacity
            style={tw`flex flex-row items-center w-full px-5 py-3 bg-white border-t border-neutral-100`}
            activeOpacity={0.6}
            onPress={() => {
              console.log('Administrator')
            }}
          >
            <MaterialIcon
              name="person"
              size="small"
              color="#7c7c7c"
            />
            <Text style={[tw`ml-3 text-base text-neutral-500`, fonts.fontPoppins]}>Administrator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center w-full px-5 py-3 bg-white border-t border-neutral-100`}
            activeOpacity={0.6}
            onPress={() => {
              console.log('Settings')
            }}
          >
            <MaterialIcon
              name="gear"
              size="small"
              color="#7c7c7c"
            />
            <Text style={[tw`ml-3 text-base text-neutral-500`, fonts.fontPoppins]}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center w-full px-5 py-3 bg-white border-t border-neutral-100`}
            activeOpacity={0.6}
            onPress={() => {
              console.log('Terms of Service')
            }}
          >
            <MaterialIcon
              name="log"
              size="small"
              color="#7c7c7c"
            />
            <Text style={[tw`ml-3 text-base text-neutral-500`, fonts.fontPoppins]}>Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center w-full px-5 py-3 bg-white border-t border-neutral-100`}
            activeOpacity={0.6}
            onPress={() => {
              console.log('Privacy Policy')
            }}
          >
            <MaterialIcon
              name="shield-check"
              size="small"
              color="#7c7c7c"
            />
            <Text style={[tw`ml-3 text-base text-neutral-500`, fonts.fontPoppins]}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center w-full px-5 py-3 bg-white border-t border-neutral-100`}
            activeOpacity={0.6}
            onPress={() => {
              console.log('About')
            }}
          >
            <MaterialIcon
              name="gear"
              size="small"
              color="#7c7c7c"
            />
            <Text style={[tw`ml-3 text-base text-neutral-500`, fonts.fontPoppins]}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center w-full px-5 py-3 bg-white border-t border-neutral-100`}
            activeOpacity={0.6}
            onPress={() => {
              console.log('Website')
            }}
          >
            <MaterialIcon
              name="rss"
              size="small"
              color="#7c7c7c"
            />
            <Text style={[tw`ml-3 text-base text-neutral-500`, fonts.fontPoppins]}>Website</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex flex-row items-center w-full px-5 py-3 bg-white border-t border-neutral-100`}
            activeOpacity={0.6}
            onPress={() => {
              console.log('Rate this App')
            }}
          >
            <MaterialIcon
              name="star"
              size="small"
              color="#7c7c7c"
            />
            <Text style={[tw`ml-3 text-base text-neutral-500`, fonts.fontPoppins]}>Rate this app</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default Menu