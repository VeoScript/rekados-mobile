import React from 'react'
import tw from 'twrnc'
import { MaterialIcon } from '../utils/Icons'
import { View, TouchableOpacity, Keyboard } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useNavigate } from '../utils/RootNavigation'

const BottomBar = () => {

  const route = useRoute()

  const [keyboardIsVisible, setKeyboardIsVisible] = React.useState<boolean>(false)

  // check if the keyboard is visible
  React.useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true)
    })
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false)
    })
    return () => {
      showListener.remove()
      hideListener.remove()
    }
  }, [])

  return (
    <React.Fragment>
      {!keyboardIsVisible && (
        <View style={tw`flex-row items-center justify-between w-full h-full max-h-[3rem] bg-white px-10 border-t border-neutral-300`}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              useNavigate('HomeScreen')
            }}
          >
            <MaterialIcon
              name="home"
              size="large"
              color={route.name === 'HomeScreen' ? '#f2b900' : '#7c7c7c'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              useNavigate('CreateDishScreen')
            }}
          >
            <MaterialIcon
              name="plus-circle"
              size="large"
              color={route.name === 'CreateDishScreen' ? '#f2b900' : '#7c7c7c'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              useNavigate('SaveDishScreen')
            }}
          >
            <MaterialIcon
              name="heart"
              size="large"
              color={route.name === 'SaveDishScreen' ? '#f2b900' : '#7c7c7c'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              useNavigate('NotificationScreen')
            }}
          >
            <MaterialIcon
              name="bell"
              size="large"
              color={route.name === 'NotificationScreen' ? '#f2b900' : '#7c7c7c'}
            />
          </TouchableOpacity>
        </View>
      )}
    </React.Fragment>
  )
}

export default BottomBar