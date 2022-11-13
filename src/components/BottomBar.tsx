import React from 'react'
import tw from 'twrnc'
import { MaterialIcon } from '../utils/Icons'
import { Appearance, View, TouchableOpacity, Keyboard, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useNavigate } from '../utils/RootNavigation'
import { fonts } from '../styles/global'

interface TypedProps {
  countUnreadNotifications: any
}

const BottomBar: React.FC<TypedProps> = ({ countUnreadNotifications }) => {

  // Set default theme of the app (set both React Native and TailwindCSS)
 const colorScheme = Appearance.getColorScheme()

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
        <View style={tw`flex-row items-center justify-between w-full h-full max-h-[3rem] px-10 border-t border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#262626]`}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              useNavigate('HomeScreen')
            }}
          >
            <MaterialIcon
              name="home"
              size="large"
              color={route.name === 'HomeScreen' ? '#f2b900' : colorScheme === 'dark' ? 'CDCDCD' : '#7c7c7c'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              useNavigate('CreateDishScreen')
            }}
          >
            <MaterialIcon
              name="plus-circle"
              size="large"
              color={route.name === 'CreateDishScreen' ? '#f2b900' : colorScheme === 'dark' ? 'CDCDCD' : '#7c7c7c'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              useNavigate('SaveDishScreen')
            }}
          >
            <MaterialIcon
              name="heart"
              size="large"
              color={route.name === 'SaveDishScreen' ? '#f2b900' : colorScheme === 'dark' ? 'CDCDCD' : '#7c7c7c'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`relative`}
            activeOpacity={0.5}
            onPress={() => {
              useNavigate('NotificationScreen')
            }}
          >
            {(countUnreadNotifications && countUnreadNotifications?._count !== 0) && (
              <View style={tw`absolute -top-3 -right-2 z-10 flex-row items-center justify-center w-full p-1 rounded-full bg-yellow-400`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsBold]}>{ countUnreadNotifications?._count }</Text>
              </View>
            )}
            <MaterialIcon
              name="bell"
              size="large"
              color={route.name === 'NotificationScreen' ? '#f2b900' : colorScheme === 'dark' ? 'CDCDCD' : '#7c7c7c'}
            />
          </TouchableOpacity>
        </View>
      )}
    </React.Fragment>
  )
}

export default BottomBar