import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { FeatherIcon } from '../../utils/Icons'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import { useNavigate } from '../../utils/RootNavigation'
import { useRoute } from '@react-navigation/native'

interface TypedProps {
  id?: string
  slug?: string
  image: string
  title: string
  description: string
}

const SearchResultDisplay: React.FC<TypedProps> = ({ id, slug, image, title, description }) => {

  const route = useRoute()
  
  const searchDishHistory = async () => {
    const searchToSave = {
      id: id,
      slug: slug,
      image: image,
      title: title,
      description: description,
      updatedAt: new Date()
    }

    // checking if there is already a dish search history in storage
    const existingSearchHistory: any = await AsyncStorage.getItem('DISH_SEARCH_HISTORY')

    let newSearchHistory = JSON.parse(existingSearchHistory)

    if (!newSearchHistory) {
      newSearchHistory = []
    }

    // the search history limit is 5, hence it will delete the last dish history
    if (newSearchHistory.length == 5) {
      newSearchHistory.pop()
      newSearchHistory.push(searchToSave)
      await AsyncStorage.setItem('DISH_SEARCH_HISTORY', JSON.stringify(newSearchHistory))
      return
    }
    
    // check if the search dish is already in the storage, hence it will appear to the top of history sorted by dish history updatedAt
    const checkDuplication = newSearchHistory?.find((history: { id: string }) => history.id === searchToSave.id)

    if (checkDuplication) {
      let dishIndex = newSearchHistory.findIndex(((history: any) => history.id === searchToSave.id))
      newSearchHistory[dishIndex].updatedAt = new Date()  
      await AsyncStorage.setItem('DISH_SEARCH_HISTORY', JSON.stringify(newSearchHistory))
      return
    }

    // for adding new dish search history
    newSearchHistory.push(searchToSave)
    await AsyncStorage.setItem('DISH_SEARCH_HISTORY', JSON.stringify(newSearchHistory))
  }

  const searchPeopleHistory = async () => {
    const searchToSave = {
      id: id,
      slug: slug,
      image: image,
      title: title,
      description: description,
      updatedAt: new Date()
    }

    // checking if there is already a people search history in storage
    const existingSearchHistory: any = await AsyncStorage.getItem('DISH_PEOPLE_HISTORY')

    let newSearchHistory = JSON.parse(existingSearchHistory)

    if (!newSearchHistory) {
      newSearchHistory = []
    }

    // the search history limit is 5, hence it will delete the last people history
    if (newSearchHistory.length == 5) {
      newSearchHistory.pop()
      newSearchHistory.push(searchToSave)
      await AsyncStorage.setItem('DISH_PEOPLE_HISTORY', JSON.stringify(newSearchHistory))
      return
    }
    
    // check if the search people is already in the storage, hence it will appear to the top of history sorted by people history updatedAt
    const checkDuplication = newSearchHistory?.find((history: { id: string }) => history.id === searchToSave.id)

    if (checkDuplication) {
      let peopleIndex = newSearchHistory.findIndex(((history: any) => history.id === searchToSave.id))
      newSearchHistory[peopleIndex].updatedAt = new Date()  
      await AsyncStorage.setItem('DISH_PEOPLE_HISTORY', JSON.stringify(newSearchHistory))
      return
    }

    // for adding new people search history
    newSearchHistory.push(searchToSave)
    await AsyncStorage.setItem('DISH_PEOPLE_HISTORY', JSON.stringify(newSearchHistory))
  }

  return (
    <TouchableOpacity
      style={tw`flex-row items-start w-full mb-3`}
      onPress={() => {
        if (route.name === 'DishesTab') {
          searchDishHistory()
          useNavigate('DisplayDishScreen', { slug: slug })
        } else {
          searchPeopleHistory()
          useNavigate('UserScreen', { id: id })
        }
      }}
    >
      {image
        ? <Image
            style={tw`flex ${route.name === 'DishesTab' ? 'rounded-xl' : 'rounded-full'} w-[3rem] h-[3rem]`}
            resizeMode="cover"
            source={{
              uri: `${ image }`
            }}
          />
        : <View style={tw`flex-row items-center justify-center w-[3rem] h-[3rem] p-2 overflow-hidden rounded-full bg-neutral-200`}>
            <FeatherIcon
              name="user"
              size="medium"
              color="#676767"
            />
          </View>
      }
      <View style={tw`flex-1 flex-col w-full mx-3`}>
        <Text style={[tw`text-lg text-neutral-600`, fonts.fontPoppinsBold]}>{ title }</Text>
        <Text
          ellipsizeMode='tail'
          numberOfLines={3}
          style={[tw`text-sm text-neutral-500`, fonts.fontPoppinsLight]}
        >
          { route.name === 'DishesTab' ? description : `@${description}` }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default SearchResultDisplay