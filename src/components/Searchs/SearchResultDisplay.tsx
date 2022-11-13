import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { FeatherIcon } from '../../utils/Icons'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import { useNavigate } from '../../utils/RootNavigation'
import { useRoute } from '@react-navigation/native'
import { useStoreDishesSearchHistory, useStorePeopleSearchHistory } from '../../lib/ReactQuery'

interface TypedProps {
  userId: string
  id?: string
  slug?: string
  image: string
  title: string
  description: string
}

const SearchResultDisplay: React.FC<TypedProps> = ({ userId, id, slug, image, title, description }) => {

  const route = useRoute()

  const storeDishesSearchHistory = useStoreDishesSearchHistory()
  const storePeopleSearchHistory = useStorePeopleSearchHistory()
  
  const searchDishHistory = async () => {
    await storeDishesSearchHistory.mutateAsync({
      searchId: String(id),
      slug: String(slug),
      image: String(image),
      title: String(title),
      description: String(description),
      userId: String(userId)
    })
  }

  const searchPeopleHistory = async () => {
    await storePeopleSearchHistory.mutateAsync({
      searchId: String(id),
      slug: String(slug),
      image: String(image),
      title: String(title),
      description: String(description),
      userId: String(userId)
    })
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
            style={tw`flex ${route.name === 'DishesTab' ? 'rounded-xl' : 'rounded-full'} w-[3rem] h-[3rem] bg-neutral-100 dark:bg-[#383838]`}
            resizeMode="cover"
            source={{
              uri: `${ image }`
            }}
          />
        : <View style={tw`flex-row items-center justify-center w-[3rem] h-[3rem] p-2 overflow-hidden rounded-full bg-neutral-200 dark:bg-[#383838]`}>
            <FeatherIcon
              name="user"
              size="medium"
              color="#676767"
            />
          </View>
      }
      <View style={tw`flex-1 flex-col w-full mx-3`}>
        <Text style={[tw`text-lg text-neutral-600 dark:text-neutral-200`, fonts.fontPoppinsBold]}>{ title }</Text>
        <Text
          ellipsizeMode='tail'
          numberOfLines={3}
          style={[tw`text-sm text-neutral-500 dark:text-neutral-400`, fonts.fontPoppinsLight]}
        >
          { route.name === 'DishesTab' ? description : `@${description}` }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default SearchResultDisplay