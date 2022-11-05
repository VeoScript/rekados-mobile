import React from 'react'
import Menu from './Modals/Menu'
import tw from 'twrnc'
import { MaterialIcon } from '../utils/Icons'
import { View, TouchableOpacity, Image } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useNavigate } from '../utils/RootNavigation'

interface NavBarTypes {
  user: any
}

const NavBar: React.FC<NavBarTypes> = ({ user }) => {

  const route: any = useRoute()

  const [modalVisible, setModalVisible] = React.useState(false)

  return (
    <React.Fragment>
      <View style={tw`flex-row items-center justify-center w-full bg-white p-5 border-b border-neutral-300`}>
        <View style={tw`flex-1 flex-row items-center justify-start w-[5rem]`}>
          {(route.name === 'DisplayDishScreen' || route.name === 'CreateDishScreen' || route.name === 'EditDishScreen')
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
        <View style={tw`flex-1 flex-row items-center justify-center w-[10rem]`}>
          <Image
            style={tw`w-[8rem] h-[2rem]`}
            resizeMode="contain"
            source={require('../assets/images/rekados-official.png')}
          />
        </View>
        <View style={tw`flex-1 flex-row items-center justify-end w-[5rem]`}>
          {(route.name !== 'UserScreen' && route.name !== 'UserSettingScreen') && (
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                useNavigate('UserScreen', { id: user.id })
              }}
            >
              <Image
                style={tw`flex rounded-full w-[2rem] h-[2rem] bg-neutral-100`}
                resizeMode="cover"
                source={{
                  uri: `${ user.profile }`
                }}
              />
            </TouchableOpacity>
          )}
          {(route.name === 'UserScreen' && user?.id === route.params?.id) && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  useNavigate('UserSettingScreen', { id: user?.id })
                }}
              >
                <MaterialIcon
                  name="gear"
                  size="medium"
                  color="#7c7c7c"
                />
              </TouchableOpacity>
            </View>
          )}
          {(route.name === 'UserSettingScreen' && user?.id === route.params?.id) && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  useNavigate('UserScreen', { id: user?.id })
                }}
              >
                <MaterialIcon
                  name="person"
                  size="medium"
                  color="#7c7c7c"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <Menu
        user={user}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </React.Fragment>
  )
}

export default NavBar