import React from 'react'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { Modal, View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import { useChangeProfile } from '../../lib/ReactQuery'
import { IMGBB_API_SECRET } from '@env'

interface TypedProps {
  userId: string
  modalVisible: any
  setModalVisible: any
  photo: any
  setPhoto: any
}

const ProfileImageUpload: React.FC<TypedProps> = ({ userId, photo, setPhoto, modalVisible, setModalVisible }) => {

  const changeProfile = useChangeProfile()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  
  const closeModal = () => {
    setPhoto(null)
    setIsLoading(false)
    setModalVisible(false)
  }

  const onUploadProfilePhoto = async () => {
    try {
      setIsLoading(true)

      const image: any = photo[0]
      const data = new FormData()
      
      data.append('image', {
        uri: image.uri,
        name: image.fileName,
        type: image.type,
        size: image.fileSize
      })

      await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_SECRET}`, {
        method: 'POST',
        body: data
      })
      .then((response) => response.json())
      .then(async (result) => {
        await changeProfile.mutateAsync({
          id: userId,
          profileURL: String(result.data.url)
        },
        {
          onError: (error) => {
            setIsLoading(false)
            console.error(error)
          },
          onSuccess: () => {
            closeModal()
          }
        })
      })
      .catch((error) => {
        console.error(error)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={modalVisible}
      onRequestClose={closeModal}      
    >
      <Pressable
        style={tw`absolute inset-0 w-full h-full bg-black bg-opacity-30`}
        disabled={isLoading}
        onPress={() => {
          if (!isLoading) {
            setModalVisible(false)
          }
        }}
      />
      <View style={tw`absolute top-1/2 -mt-[10rem] w-full px-5`}>
        <View style={tw`flex-col items-center justify-center w-full p-5 rounded-xl overflow-hidden bg-white dark:bg-[#383838]`}>
          <Text style={[tw`text-xl text-center text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsBold]}>Change Profile</Text>
          {photo && (
            <Image
              style={tw`flex rounded-full my-3 w-[10rem] h-[10rem]`}
              resizeMode="cover"
              source={{
                uri: `${ photo[0].uri }`
              }}
            />
          )}
          <Text style={[tw`text-xs text-center text-neutral-600 dark:text-neutral-400 mb-3`, fonts.fontPoppinsLight]}>This will be the actual size of your profile.</Text>
          <View style={tw`flex-row items-center justify-center w-full`}>
            {isLoading && (
              <View style={tw`w-full`}>
                <Text style={[tw`w-full mx-0.5 text-sm text-center text-white bg-[#F3B900] bg-opacity-50 px-3 py-2 rounded-xl`, fonts.fontPoppins]}>Uploading...</Text>
              </View>
            )}
            {!isLoading && (
              <React.Fragment>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={onUploadProfilePhoto}
                >
                  <Text style={[tw`w-[7rem] mx-0.5 text-sm text-center text-white bg-[#F3B900] px-3 py-2 rounded-xl`, fonts.fontPoppins]}>Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={closeModal}
                >
                  <Text style={[tw`w-[7rem] mx-0.5 text-sm text-center text-neutral-600 bg-neutral-200 px-3 py-2 rounded-xl`, fonts.fontPoppins]}>Cancel</Text>
                </TouchableOpacity>
              </React.Fragment>
            )}
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ProfileImageUpload