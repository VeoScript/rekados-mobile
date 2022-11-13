import React from 'react'
import ProfileImageUpload from '../../components/Uploads/ProfileImageUpload'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { FeatherIcon } from '../../utils/Icons'
import { Appearance, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'

interface TypedProps {
  user: any
  profileId: string
}

const UserProfileLayout: React.FC<TypedProps> = ({ user, profileId }) => {

  // detect the default color scheme of devices (light mode or dark mode) *REACT NATIVE
  const colorScheme = Appearance.getColorScheme()

  // getting the selected photo for upload
  const [photo, setPhoto] = React.useState<any>(null)

  // profile image modal state
  const [modalVisible, setModalVisible] = React.useState<boolean>(false)

  const handleChoosePhoto = () => {
    let options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        setPhoto(null)
        setModalVisible(false)
        return
      }
      if (response) {
        setPhoto(response.assets)
        setModalVisible(true)
      }
    })
  }

  return (
    <View style={tw`flex-col w-full h-full`}>
      <ScrollView contentContainerStyle={tw`flex-col items-center justify-start w-full py-3`} keyboardShouldPersistTaps="handled">
        <View style={tw`relative my-3`}>
          {user.profile
            ? <Image
                style={tw`flex rounded-full w-[10rem] h-[10rem] bg-neutral-100 dark:bg-[#383838]`}
                resizeMode="cover"
                source={{
                  uri: `${ user.profile }`
                }}
              />
            : <View style={tw`flex-row items-center justify-center w-[10rem] h-[10rem] p-2 overflow-hidden rounded-full bg-[#F3B900] bg-opacity-50 dark:bg-[#383838]`}>
                <FeatherIcon
                  name="user"
                  size="ultraLarge"
                  color={colorScheme === 'dark' ? '#CDCDCD' : '#676767'}
                />
              </View>
          }
          {user.id === profileId && (
            <TouchableOpacity
              style={tw`absolute bottom-3 right-3 rounded-full p-2 bg-black dark:bg-white bg-opacity-50 dark:bg-opacity-80`}
              disabled={modalVisible}
              onPress={handleChoosePhoto}
            >
              <FeatherIcon
                name="camera"
                size="small"
                color={colorScheme === 'dark' ? '#000000' : '#FFFFFF'}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={tw`flex-col items-center w-full my-3`}>
          <Text style={[tw`text-2xl text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsBold]}>{ user.name }</Text>
          <Text style={[tw`my-2 text-sm text-center text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsLight]}>{(user.bio && user.bio !== '') ? user.bio : 'Welcome to Rekados'}</Text>
        </View>
        <View style={tw`flex-row items-center justify-between w-full`}>
          <View style={tw`flex-1 flex-col items-center w-full p-3 border-r border-white dark:border-[#262626] bg-[#F3B900] dark:bg-[#383838] bg-opacity-50 dark:bg-opacity-100`}>
            <Text style={[tw`text-xl text-neutral-600 dark:text-neutral-300`, fonts.fontPoppinsBold]}>{ user.dishes.length }</Text>
            <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-300`, fonts.fontPoppinsLight]}>Dishes</Text>
          </View>
          <View style={tw`flex-1 flex-col items-center w-full p-3 bg-[#F3B900] dark:bg-[#383838] bg-opacity-50 dark:bg-opacity-100`}>
            <Text style={[tw`text-xl text-neutral-600 dark:text-neutral-300`, fonts.fontPoppinsBold]}>{ user.likes.length }</Text>
            <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-300`, fonts.fontPoppinsLight]}>Likes</Text>
          </View>
        </View>
        <View style={tw`flex-col items-center w-full`}>
          <View style={tw`flex-col items-start w-full p-3 border-b border-neutral-100 dark:border-neutral-700`}>
            <Text style={[tw`text-sm text-yellow-500`, fonts.fontPoppins]}>Location</Text>
            <Text style={[tw`text-base text-neutral-600 dark:text-neutral-400`, fonts.fontPoppins]}>{ (user.location && user.location !== '') ? user.location : 'N/A' }</Text>
          </View>
          <View style={tw`flex-col items-start w-full p-3 border-b border-neutral-100 dark:border-neutral-700`}>
            <Text style={[tw`text-sm text-yellow-500`, fonts.fontPoppins]}>Username</Text>
            <Text style={[tw`text-base text-neutral-600 dark:text-neutral-400`, fonts.fontPoppins]}>@{ user.username }</Text>
          </View>
          <View style={tw`flex-col items-start w-full p-3 border-b border-neutral-100 dark:border-neutral-700`}>
            <Text style={[tw`text-sm text-yellow-500`, fonts.fontPoppins]}>Email</Text>
            <Text style={[tw`text-base text-neutral-600 dark:text-neutral-400`, fonts.fontPoppins]}>{ user.email }</Text>
          </View>
        </View>
      </ScrollView>
      <ProfileImageUpload
        userId={user.id}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        photo={photo}
        setPhoto={setPhoto}
      />
    </View>
  )
}

export default UserProfileLayout