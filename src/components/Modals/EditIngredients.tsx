import React from 'react'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { MaterialIcon } from '../../utils/Icons'
import { Toast } from '../../utils/Toast'
import { ScrollView, View, Modal, Text, TextInput, TouchableOpacity, Alert } from 'react-native'

interface TypedProps {
  modalVisible: any
  setModalVisible: any
  ingredientsState: any
  setIngredientsState: any
}

const EditIngredients: React.FC<TypedProps> = ({ ingredientsState, setIngredientsState, modalVisible, setModalVisible }) => {

  const [ingredientID, setIngredientID] = React.useState<string>('')
  const [editIngredient, setEditIngredient] = React.useState<string>('')

  const handleEditIngredient = (ingredientValue: string) => {
    if (ingredientValue !== '') {
      let ingredientIndex = ingredientsState.findIndex(((ingredient : { id: string }) => ingredient.id === ingredientID))
      ingredientsState[ingredientIndex].name = ingredientValue
      setEditIngredient('')
      setIngredientID('')
    } else {
      Toast('Ingredient is required')
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setEditIngredient('')
        setModalVisible(false)
      }}      
    >
      <ScrollView style={tw`w-full h-full bg-white dark:bg-[#262626]`} keyboardShouldPersistTaps="handled">
        <View style={tw`flex flex-col w-full p-5`}>
          <View style={tw`flex flex-row items-center justify-between w-full px-2`}>
            <Text style={[tw`text-xl text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsBold]}>Edit Ingredients</Text>
            <TouchableOpacity
              onPress={() => {
                setEditIngredient('')
                setModalVisible(false)
              }}
            >
              <MaterialIcon
                name="x"
                size="medium"
                color="#c3c3c3"
              />
            </TouchableOpacity>
          </View>
          <View style={tw`flex flex-col w-full my-3`}>
            <View style={tw`flex flex-col my-1`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600 dark:text-neutral-400`, fonts.fontPoppinsLight]}>Ingredient</Text>
                <Text style={[tw`text-sm text-red-600`, fonts.fontPoppinsLight]}>*</Text>
              </View>
              <View style={tw`flex flex-row items-center justify-between w-full px-3 text-sm rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`}>
                <TextInput
                  style={[tw`flex flex-row w-[17rem] text-black dark:text-white`, fonts.fontPoppins]}
                  editable={ingredientID !== ''}
                  value={editIngredient}
                  onChangeText={(value: string) => {
                    setEditIngredient(value)
                  }}
                />
                <TouchableOpacity
                  disabled={ingredientID === ''}
                  onPress={() => {
                    handleEditIngredient(editIngredient)
                  }}
                >
                  <MaterialIcon
                    name="check"
                    size="medium"
                    color={ingredientID === '' ? '#CDCDCD' : '#f2b900'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {ingredientsState.length > 0 && (
            <React.Fragment>
              <View style={tw`flex flex-row items-start justify-between w-full px-2`}>
                <View style={tw`flex-col`}>
                  <Text style={[tw`text-xl text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsBold]}>Ingredients List</Text>
                  <Text style={[tw`text-sm text-yellow-500 mt-1`, fonts.fontPoppinsLight]}>Click something on the list to edit.</Text>
                </View>
                <TouchableOpacity
                  style={tw`flex flex-row items-center justify-center px-3 py-0.5 rounded-md bg-neutral-600`}
                  activeOpacity={0.7}
                  onPress={() => {
                    Alert.alert(
                      '',
                      'Are you sure you want to reset all ingredients?',
                      [
                        {
                          text: 'Cancel',
                          style: "cancel"
                        },
                        {
                          text: 'Yes',
                          onPress: async () => {
                            setIngredientsState([])
                          },
                          style: "default"
                        }
                      ],
                      {
                        cancelable: true
                      }
                    )
                  }}
                >
                  <Text style={[tw`text-sm text-white`, fonts.fontPoppins]}>Reset</Text>
                </TouchableOpacity>
              </View>
              <View style={tw`flex flex-col w-full my-3`}>
                {ingredientsState.map((ingredient: { id: string, name: string }, i: number) => (
                  <TouchableOpacity
                    key={i}
                    onPress={() => {
                      setEditIngredient(ingredient.name)
                      setIngredientID(ingredient.id)
                    }}
                    style={tw`flex flex-row items-center justify-between w-full p-3 my-0.5 text-sm rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`}
                  >
                    <Text style={[tw`text-neutral-600 dark:text-white pr-5`, fonts.fontPoppins]}>{ ingredient.name }</Text>
                    <TouchableOpacity
                      onPress={() => {
                        ingredientsState.splice(i, 1)
                        setIngredientsState([...ingredientsState])
                      }}
                    >
                      <MaterialIcon
                        name="x"
                        size="small"
                        color="#c3c3c3"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            </React.Fragment>
          )}
        </View>
      </ScrollView>
    </Modal>
  )
}

export default EditIngredients