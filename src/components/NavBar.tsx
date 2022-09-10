import React from 'react'
import tw from 'twrnc'
import { fonts } from '../styles/global'
import { View, Text, TouchableOpacity } from 'react-native'
import { MaterialIcon } from '../utils/Icons'
import Menu from './Modals/Menu'
import { useRoute } from '@react-navigation/native'
import { useNavigate } from '../utils/RootNavigation'

const NavBar = () => {

  const route = useRoute()

  const [modalVisible, setModalVisible] = React.useState(false)

  return (
    <React.Fragment>
      <View style={tw`flex flex-row items-center justify-center w-full bg-white px-3 py-5 border-b border-neutral-300`}>
        <View style={tw`flex flex-row items-center justify-start w-[5rem]`}>
          {route.name === 'DisplayDishScreen'
            ? <TouchableOpacity
                onPress={() => {
                  useNavigate('HomeScreen')
                }}
              >
                <MaterialIcon
                  name="chevron-left"
                  size="medium"
                  color="#7c7c7c"
                />
              </TouchableOpacity>  
            : <TouchableOpacity
                onPress={() => {
                  setModalVisible(true)
                }}
              >
                <MaterialIcon
                  name="three-bars"
                  size="medium"
                  color="#7c7c7c"
                />
              </TouchableOpacity>      
          }
        </View>
        <View style={tw`flex flex-row items-center justify-center w-[10rem]`}>
          <Text style={[tw`text-2xl text-center text-[#f2b900]`, fonts.fontPoppinsBlack]}>REKADOS</Text>
        </View>
        <View style={tw`flex flex-row items-center justify-end w-[5rem]`}>
          <Text style={[tw`text-right text-base`, fonts.fontPoppinsBold]}>Asia</Text>
        </View>
      </View>
      <Menu
        modalData={[]}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </React.Fragment>
  )
}

export default NavBar