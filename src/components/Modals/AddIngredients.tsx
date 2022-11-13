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

const AddIngredients: React.FC<TypedProps> = ({ ingredientsState, setIngredientsState, modalVisible, setModalVisible }) => {

  const [addIngredient, setAddIngredient] = React.useState<string>('')

  const handleAddIngredient = (ingredientValue: string) => {
    if (ingredientValue !== '') {
      const ingredientData = [{ name: ingredientValue }]
      setIngredientsState([...ingredientsState, ...ingredientData])
      setAddIngredient('')
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
        setAddIngredient('')
        setModalVisible(false)
      }}      
    >
      <ScrollView style={tw`w-full h-full bg-white dark:bg-[#262626]`} keyboardShouldPersistTaps="handled">
        <View style={tw`flex flex-col w-full p-5`}>
          <View style={tw`flex flex-row items-center justify-between w-full px-2`}>
            <Text style={[tw`text-xl text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsBold]}>Add Ingredients</Text>
            <TouchableOpacity
              onPress={() => {
                setAddIngredient('')
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
                  value={addIngredient}
                  onChangeText={(value: string) => {
                    setAddIngredient(value)
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    handleAddIngredient(addIngredient)
                  }}
                >
                  <MaterialIcon
                    name="plus"
                    size="medium"
                    color="#f2b900"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {ingredientsState.length > 0 && (
            <React.Fragment>
              <View style={tw`flex flex-row items-center justify-between w-full px-2`}>
                <Text style={[tw`text-xl text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsBold]}>Ingredients List</Text>
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
                {ingredientsState.map((ingredient: { name: string }, i: number) => (
                  <View
                    key={i}
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
                  </View>
                ))}
              </View>
            </React.Fragment>
          )}
        </View>
      </ScrollView>
    </Modal>
  )
}

export default AddIngredients