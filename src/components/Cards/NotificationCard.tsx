import React from 'react'
import tw from 'twrnc'
import moment from 'moment'
import { fonts } from '../../styles/global'
import { FeatherIcon } from '../../utils/Icons'
import { Appearance, View, Text, TouchableOpacity } from 'react-native'
import { useNavigate } from '../../utils/RootNavigation'
import { useReadNotification } from '../../lib/ReactQuery'

interface TypedProps {
  notification: any
}

const NotificationCard: React.FC<TypedProps> = ({ notification }) => {

  // detect the default color scheme of devices (light mode or dark mode) *REACT NATIVE
  const colorScheme = Appearance.getColorScheme()

  const readNotification = useReadNotification()

  const onReadNotification = async () => {
    useNavigate('DisplayDishScreen', { slug: notification.item.dish.slug })
    if (!notification.item.read) {
      await readNotification.mutateAsync({
        notificationId: notification.item.id
      },
      {
        onError: (error: any) => {
          console.error('ON READ NOTIFICATION', error.response.data)
        }
      })
    }
  }

  return (
    <TouchableOpacity
      style={tw`flex-row items-start w-full overflow-hidden rounded-2xl mb-1 px-2 py-3 ${ notification.item.read ? 'bg-transparent' : colorScheme === 'dark' ? 'bg-neutral-900' : 'bg-yellow-50' }`}
      activeOpacity={0.5}
      onPress={onReadNotification}
    >
      {notification.item.type === 'LIKE' && (
        <View style={tw`flex-row items-center justify-center w-[2.5rem] h-[2.5rem] p-2 overflow-hidden rounded-full bg-red-400`}>
          <FeatherIcon
            name="heart"
            size="medium"
            color="#FFFFFF"
          />
        </View>
      )}
      {notification.item.type === 'COMMENT' && (
        <View style={tw`flex-row items-center justify-center w-[2.5rem] h-[2.5rem] p-2 overflow-hidden rounded-full bg-blue-400`}>
          <FeatherIcon
            name="message-square"
            size="medium"
            color="#FFFFFF"
          />
        </View>
      )}
      <View style={tw`flex-1 w-full mx-3 overflow-hidden`}>
        <Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              useNavigate('UserScreen', { id: notification.item.notificationFrom.id })
            }}
          >
            <Text style={[tw`-mb-1.5 text-base text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsBold]}>{ notification.item.notificationFrom.name } </Text>
          </TouchableOpacity>
          <Text style={[tw`text-base text-neutral-500 dark:text-neutral-400`, fonts.fontPoppins]}>{ notification.item.message }</Text>
          <Text style={[tw`text-base text-yellow-500`, fonts.fontPoppinsBold]}> { notification.item.dish.title }.</Text>
        </Text>
        <Text style={[tw`text-xs text-neutral-400 mt-3`, fonts.fontPoppinsLight]}>{ moment(notification.item.createdAt).fromNow() }</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NotificationCard