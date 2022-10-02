import React from 'react'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { Toast } from '../../utils/Toast'
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { useDeleteDishMutation } from '../../lib/ReactQuery'

interface TypedProps {
  title: string
  slug: string
  modalVisible: any
  setModalVisible: any
}

const DeleteDish: React.FC<TypedProps> = ({ title, slug, modalVisible, setModalVisible }) => {

  const deleteDishMutation = useDeleteDishMutation()

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const onDelete = async () => {
    setIsLoading(true)
    await deleteDishMutation.mutateAsync({
      slug: slug
    },
    {
      onError: (error: any) => {
        setIsLoading(false)
        Toast(`${error.response.data}`)
      },
      onSuccess: () => {
        setIsLoading(false)
        setModalVisible(false)
        Toast('Deleted Successfully.')
      }
    })
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        if (!isLoading) {
          setModalVisible(false)
        }
      }}      
    >
      <Pressable
        style={tw`absolute inset-0 w-full h-full bg-black bg-opacity-30`}
        onPress={() => {
          if (!isLoading) {
            setModalVisible(false)
          }
        }}
      />
      <View style={tw`absolute top-1/2 -mt-16 w-full px-5`}>
        <View style={tw`flex-col items-center justify-center w-full p-5 rounded-xl overflow-hidden bg-white`}>
          <Text style={[tw`text-xl text-center text-red-500`, fonts.fontPoppinsBold]}>Delete</Text>
          <Text style={[tw`my-3 text-base text-center text-neutral-600`, fonts.fontPoppins]}>Are you sure you want to delete {title}.</Text>
          <View style={tw`flex-row items-center justify-center w-full`}>
            {isLoading && (
              <View style={tw`w-full`}>
                <Text style={[tw`w-full mx-0.5 text-sm text-center text-white bg-red-500 bg-opacity-50 px-3 py-2 rounded-xl`, fonts.fontPoppins]}>Deleting...</Text>
              </View>
            )}
            {!isLoading && (
              <React.Fragment>
                <TouchableOpacity onPress={onDelete}>
                  <Text style={[tw`w-[7rem] mx-0.5 text-sm text-center text-white bg-red-500 px-3 py-2 rounded-xl`, fonts.fontPoppins]}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
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

export default DeleteDish