import React from 'react'
import AddIngredients from '../../components/Modals/AddIngredients'
import AddProcedures from '../../components/Modals/AddProcedures'
import tw from 'twrnc'
import { fonts, customStyle } from '../../styles/global'
import { MaterialIcon } from '../../utils/Icons'
import { Dropdown } from 'react-native-element-dropdown'
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native'

const CreateDishLayout = () => {

  const [isLoading, setIsLoading] = React.useState<Boolean>(false)

  // input fields state
  const [title, setTitle] = React.useState<string>('')
  const [category, setCategory] = React.useState<string>('')
  const [location, setLocation] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [author, setAuthor] = React.useState<string>('')
  const [youtubeUrl, setYoutubeUrl] = React.useState<string>('')

  // ingredients state
  const [ingredientsModalVisible, setIngredientsModalVisible] = React.useState<Boolean>(false)
  const [ingredientsState, setIngredientsState] = React.useState<any>([])

  // procedures state
  const [proceduresModalVisible, setProceduresModalVisible] = React.useState<Boolean>(false)
  const [proceduresState, setProceduresState] = React.useState<any>([])

  // dropdown values for category
  const categoryData = [
    { label: 'Dairy Foods', value: 'Dairy Foods' },
    { label: 'Fish and Seafood', value: 'Fish and Seafood' },
    { label: 'Fruits', value: 'Fruits' },
    { label: 'Grains, Beans and Nuts', value: 'Grains, Beans and Nuts' },
    { label: 'Meat and Poultry', value: 'Meat and Poultry' },
    { label: 'Vegetables', value: 'Vegetables' }
  ]

  // dropdown values for location
  const locationData = [
    { label: 'Global', value: 'Global' },
    { label: 'Africa', value: 'Africa' },
    { label: 'Antarctica', value: 'Antarctica' },
    { label: 'Asia', value: 'Asia' },
    { label: 'Australia', value: 'Australia' },
    { label: 'Europe', value: 'Europe' },
    { label: 'North America', value: 'North America' },
    { label: 'South America', value: 'South America' },
  ]
  
  const handleSaveDish = async () => {
    // console.log('Form Data', {
    //   title: title,
    //   category: category,
    //   location: location,
    //   description: description,
    //   author: author,
    //   youtubeUrl: youtubeUrl
    // })
    // console.log('Ingredients', ingredientsState)
    // console.log('Procedures', proceduresState)
  }

  return (
    <React.Fragment>
      <ScrollView style={tw`flex flex-col w-full`}>
        <View style={tw`flex flex-col p-3`}>
          <View style={tw`flex flex-col px-1`}>
            <Text style={[tw`text-2xl text-neutral-600`, fonts.fontPoppinsBold]}>Create Dish</Text>
            <Text style={[tw`text-sm text-neutral-400`, fonts.fontPoppinsLight]}>Share your dish around the world.</Text>
          </View>
          <View style={tw`flex flex-col w-full mt-3`}>
            <View style={tw`flex flex-col my-1`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Title</Text>
                <Text style={[tw`text-sm text-red-600`, fonts.fontPoppinsLight]}>*</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                placeholder="Recipe Title"
                value={title}
                onChangeText={(value: string) => {
                  setTitle(value)
                }}
              />
            </View>
            <View style={tw`flex flex-col my-1`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Category</Text>
                <Text style={[tw`text-sm text-red-600`, fonts.fontPoppinsLight]}>*</Text>
              </View>
              <Dropdown
                style={[tw`flex w-full px-3 py-1 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                placeholderStyle={[tw`text-sm text-neutral-400`, fonts.fontPoppins]}
                selectedTextStyle={[tw`text-sm text-black`, fonts.fontPoppins]}
                data={categoryData}
                maxHeight={250}
                statusBarIsTranslucent={true}
                labelField="label"
                valueField="value"
                placeholder="Recipe Category"
                value={category}
                onChange={item => {
                  setCategory(item.value)
                }}
              />
            </View>
            <View style={tw`flex flex-col my-1`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Location</Text>
                <Text style={[tw`text-sm text-red-600`, fonts.fontPoppinsLight]}>*</Text>
              </View>
              <Dropdown
                style={[tw`flex w-full px-3 py-1 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                placeholderStyle={[tw`text-sm text-neutral-400`, fonts.fontPoppins]}
                selectedTextStyle={[tw`text-sm text-black`, fonts.fontPoppins]}
                data={locationData}
                maxHeight={250}
                statusBarIsTranslucent={true}
                labelField="label"
                valueField="value"
                placeholder="Recipe Category"
                value={location}
                onChange={item => {
                  setLocation(item.value)
                }}
              />
            </View>
            <View style={tw`flex flex-col my-1`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Description</Text>
                <Text style={[tw`text-sm text-red-600`, fonts.fontPoppinsLight]}>*</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins, customStyle.alignTop]}
                placeholder="Recipe Description"
                multiline={true}
                numberOfLines={5}
                value={description}
                onChangeText={(value: string) => {
                  setDescription(value)
                }}
              />
            </View>
            <View style={tw`flex flex-col my-1`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Author</Text>
                <Text style={[tw`text-sm text-red-600`, fonts.fontPoppinsLight]}>*</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                placeholder="Recipe Author"
                value={author}
                onChangeText={(value: string) => {
                  setAuthor(value)
                }}
              />
            </View>
            <View style={tw`flex flex-col my-1`}>
              <Text style={[tw`mx-2 mb-1 text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Youtube URL</Text>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                placeholder="Recipe Youtube URL"
                value={youtubeUrl}
                onChangeText={(value: string) => {
                  setYoutubeUrl(value)
                }}
              />
            </View>
          </View>
          <View>
            <View style={tw`flex flex-row items-center justify-between w-full px-1 py-2`}>
              <Text style={[tw`text-xl text-center text-neutral-500 uppercase`, fonts.fontPoppinsBold]}>Ingredients</Text>
              <TouchableOpacity
                onPress={() => {
                  setIngredientsModalVisible(true)
                }}
              >
                <MaterialIcon
                  name="plus"
                  size="medium"
                  color="#222222"
                />
              </TouchableOpacity>
            </View>
            <View style={tw`flex flex-col w-full`}>
              {ingredientsState.map((ingredient: { name: string }, i: number) => (
                <View key={i} style={tw`flex flex-col my-1`}>
                  <Text style={[tw`mx-2 mb-1 text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Ingredient { i + 1 }</Text>
                  <View style={tw`flex flex-row items-center justify-between w-full p-3 text-sm rounded-xl border border-neutral-200 bg-white`}>
                    <Text style={[tw`text-black`, fonts.fontPoppins]}>{ ingredient.name }</Text>
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
                </View>
              ))}
            </View>
          </View>
          <View>
            <View style={tw`flex flex-row items-center justify-between w-full px-1 py-2`}>
              <Text style={[tw`text-xl text-center text-neutral-500 uppercase`, fonts.fontPoppinsBold]}>Procedures</Text>
              <TouchableOpacity
                onPress={() => {
                  setProceduresModalVisible(true)
                }}
              >
                <MaterialIcon
                  name="plus"
                  size="medium"
                  color="#222222"
                />
              </TouchableOpacity>
            </View>
            <View style={tw`flex flex-col w-full`}>
              {proceduresState.map((procedure: { name: string }, i: number) => (
                <View key={i} style={tw`flex flex-col my-1`}>
                  <Text style={[tw`mx-2 mb-1 text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Procedure { i + 1 }</Text>
                  <View style={tw`flex flex-row items-center justify-between w-full p-3 text-sm rounded-xl border border-neutral-200 bg-white`}>
                    <Text style={[tw`text-black`, fonts.fontPoppins]}>{ procedure.name }</Text>
                    <TouchableOpacity
                      onPress={() => {
                        proceduresState.splice(i, 1)
                        setProceduresState([...proceduresState])
                      }}
                    >
                      <MaterialIcon
                        name="x"
                        size="small"
                        color="#c3c3c3"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
            {(ingredientsState.length > 0 && proceduresState.length > 0) && (
              <View style={tw`flex flex-col my-1`}>
                <TouchableOpacity
                  style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900]`}
                  activeOpacity={0.7}
                  onPress={handleSaveDish}
                >
                  <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Save Dish</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <AddIngredients
        ingredientsState={ingredientsState}
        setIngredientsState={setIngredientsState}
        modalVisible={ingredientsModalVisible}
        setModalVisible={setIngredientsModalVisible} 
      />
      <AddProcedures
        proceduresState={proceduresState}
        setProceduresState={setProceduresState}
        modalVisible={proceduresModalVisible}
        setModalVisible={setProceduresModalVisible} 
      />
    </React.Fragment>
  )
}

export default CreateDishLayout