import React from 'react'
import AddIngredients from '../../components/Modals/AddIngredients'
import AddProcedures from '../../components/Modals/AddProcedures'
import tw from 'twrnc'
import { fonts, customStyle } from '../../styles/global'
import { FeatherIcon, MaterialIcon } from '../../utils/Icons'
import { Dropdown } from 'react-native-element-dropdown'
import { launchImageLibrary } from 'react-native-image-picker'
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useCreateDishMutation, useCreateIngredientsMutation, useCreateProceduresMutation } from '../../lib/ReactQuery'
import { useNavigate } from '../../utils/RootNavigation'
import { IMGBB_API_SECRET } from '@env'

interface TypedProps {
  user: any
}

const CreateDishLayout: React.FC<TypedProps> = ({ user }) => {

  const createDishMutation = useCreateDishMutation()
  const createIngredientsMutation = useCreateIngredientsMutation()
  const createProceduresMutation = useCreateProceduresMutation()

  // loading state
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  // getting the selected photo for upload
  const [photo, setPhoto] = React.useState<any>(null)

  // input fields state
  const [title, setTitle] = React.useState<string>('')
  const [category, setCategory] = React.useState<string>('')
  const [location, setLocation] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
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

  const clearState = () => {
    setIsLoading(false)
    setPhoto(null)
    setTitle('')
    setCategory('')
    setLocation('')
    setDescription('')
    setYoutubeUrl('')
    setIngredientsState([])
    setProceduresState([])
  }

  const handleChoosePhoto = () => {
    let options: any = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false
    }

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        setPhoto(null)
        return
      }
      if (response) {
        setPhoto(response.assets)
      }
    })
  }

  const handleSaveDish = async () => {
    try {
      setIsLoading(true)

      // custom slug generator 4 beats
      const slug = Math.random().toString(36).slice(-6)
        
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
        await createDishMutation.mutateAsync({
          slug: String(slug),
          image: `${result.data.url}`,
          title: title,
          category: category,
          location: location,
          description: description,
          youtube: youtubeUrl,
          authorId: user.id
        },
        {
          onError: (error) => {
            setIsLoading(false)
            console.error(error)
          },
          onSuccess: async () => {
            // mutation for ingredients
            for (let i = 0; i < ingredientsState.length; i++) {
              await createIngredientsMutation.mutateAsync({
                slug: slug,
                ingredient: ingredientsState[i].name
              })
            }
            // mutation for procedures
            for (let j = 0; j < proceduresState.length; j++) {
              await createProceduresMutation.mutateAsync({
                slug: slug,
                procedure: proceduresState[j].details
              })
            }
            clearState()
            useNavigate('HomeScreen')
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
    <React.Fragment>
      <ScrollView style={tw`flex flex-col w-full`}>
        <View style={tw`flex flex-col p-3`}>
          <View style={tw`flex flex-col px-1`}>
            <Text style={[tw`text-2xl text-neutral-600`, fonts.fontPoppinsBold]}>Create Dish</Text>
            <Text style={[tw`text-sm text-neutral-400`, fonts.fontPoppinsLight]}>Share your dish around the world.</Text>
          </View>
          <View style={tw`flex flex-col w-full mt-3`}>
            <View style={tw`flex flex-col my-1`}>
              <View style={tw`relative w-full overflow-hidden rounded-xl my-3`}>
                {photo === null
                  ? <View style={tw`flex flex-row items-center justify-center w-full h-[10rem] bg-neutral-100`}>
                      <Text style={[tw`text-neutral-400 text-sm`, fonts.fontPoppinsBold]}>Add Photo</Text>
                    </View>
                  : <Image
                      style={tw`flex w-full h-[10rem]`}
                      resizeMode="cover"
                      source={{
                        uri: `${ photo[0].uri }`
                      }}
                    />
                }
                <React.Fragment>
                  {photo !== null && (
                    <TouchableOpacity
                      style={tw`absolute top-3 right-3 rounded-full p-1 bg-white bg-opacity-80`}
                      disabled={isLoading}
                      onPress={() => setPhoto(null)}
                    >
                      <FeatherIcon
                        name="x"
                        size="small"
                        color='#222222'
                      />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={tw`absolute bottom-3 right-3 rounded-full p-2 bg-white bg-opacity-80`}
                    disabled={isLoading}
                    onPress={handleChoosePhoto}
                  >
                    <FeatherIcon
                      name="camera"
                      size="small"
                      color='#222222'
                    />
                  </TouchableOpacity>
                </React.Fragment>
              </View>
            </View>
            <View style={tw`flex flex-col my-1`}>
              <View style={tw`flex flex-row items-center mx-2 mb-1`}>
                <Text style={[tw`text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Title</Text>
                <Text style={[tw`text-sm text-red-600`, fonts.fontPoppinsLight]}>*</Text>
              </View>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                placeholder="Recipe Title"
                editable={!isLoading}
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
                selectedTextStyle={[tw`text-sm ${isLoading ? 'text-neutral-300' : 'text-black'}`, fonts.fontPoppins]}
                disable={isLoading}
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
                selectedTextStyle={[tw`text-sm ${isLoading ? 'text-neutral-300' : 'text-black'}`, fonts.fontPoppins]}
                disable={isLoading}
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
                editable={!isLoading}
                multiline={true}
                numberOfLines={5}
                value={description}
                onChangeText={(value: string) => {
                  setDescription(value)
                }}
              />
            </View>
            <View style={tw`flex flex-col my-1`}>
              <Text style={[tw`mx-2 mb-1 text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Youtube URL</Text>
              <TextInput
                style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
                placeholder="Recipe Youtube URL"
                editable={!isLoading}
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
              {!isLoading && (
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
              )}
            </View>
            <View style={tw`flex flex-col w-full`}>
              {ingredientsState.map((ingredient: { name: string }, i: number) => (
                <View key={i} style={tw`flex flex-col my-1`}>
                  <Text style={[tw`mx-2 mb-1 text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Ingredient { i + 1 }</Text>
                  <View style={tw`flex flex-row items-center justify-between w-full p-3 text-sm rounded-xl border border-neutral-200 bg-white`}>
                    <Text style={[tw`text-black`, fonts.fontPoppins]}>{ ingredient.name }</Text>
                    {!isLoading && (
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
                    )}
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View>
            <View style={tw`flex flex-row items-center justify-between w-full px-1 py-2`}>
              <Text style={[tw`text-xl text-center text-neutral-500 uppercase`, fonts.fontPoppinsBold]}>Procedures</Text>
              {!isLoading && (
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
              )}
            </View>
            <View style={tw`flex flex-col w-full`}>
              {proceduresState.map((procedure: { details: string }, i: number) => (
                <View key={i} style={tw`flex flex-col my-1`}>
                  <Text style={[tw`mx-2 mb-1 text-sm text-neutral-600`, fonts.fontPoppinsLight]}>Procedure { i + 1 }</Text>
                  <View style={tw`flex flex-row items-center justify-between w-full p-3 text-sm rounded-xl border border-neutral-200 bg-white`}>
                    <Text style={[tw`text-black`, fonts.fontPoppins]}>{ procedure.details }</Text>
                    {!isLoading && (
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
                    )}
                  </View>
                </View>
              ))}
            </View>
            {(photo !== null && title !== '' && category !== '' && location !== '' && description !== '' && (ingredientsState.length > 0 && proceduresState.length > 0)) && (
              <React.Fragment>
                {isLoading && (
                  <View style={tw`flex flex-col my-1`}>
                    <View style={tw`flex flex-row items-center justify-center w-full p-3 text-sm rounded-xl bg-[#f2b900] bg-opacity-70`}>
                      <Text style={[tw`text-base text-white`, fonts.fontPoppins]}>Saving...</Text>
                    </View>
                  </View>
                )}
                {!isLoading && (
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
              </React.Fragment>
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