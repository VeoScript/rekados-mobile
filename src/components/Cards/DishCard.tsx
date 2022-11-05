import React from 'react'
import LikeButton from '../Interactions/LikeButton'
import tw from 'twrnc'
import { FeatherIcon, MaterialIcon } from '../../utils/Icons'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { fonts } from '../../styles/global'
import { useNavigate } from '../../utils/RootNavigation'

interface TypedProps {
  user: Object
  dish: {
    item: {
      id: string
      slug: string
      title: string
      image: string
      category: string
      location: string
      description: string
      youtube: string
      ingredients: Object
      procedures: Object
      likes: any
      comments: any
      author: any
    }
  }
}

const DishCard: React.FC<TypedProps> = ({ user, dish }) => {
  return (
    <TouchableOpacity
      style={tw`flex flex-col items-start w-full p-3 mb-2 bg-neutral-50 rounded-xl`}
      activeOpacity={0.6}
      onPress={() => {
        useNavigate('DisplayDishScreen', { slug: dish.item.slug })
      }}
    >
      <View style={tw`flex flex-row items-center justify-between w-full`}>
        <View style={tw`flex flex-row items-center`}>
          <MaterialIcon
            name="repo"
            size="small"
            color="#c3c3c3"
          />
          <Text style={[tw`text-lg text-neutral-600 mx-2 capitalize`, fonts.fontPoppinsBold]}>{ dish.item.title }</Text>
        </View>
        <LikeButton
          user={user}
          author={dish.item.author}
          slug={dish.item.slug}
          likes={dish.item.likes}
        />
      </View>
      <View style={tw`w-full overflow-hidden rounded-xl my-3`}>
        <Image
          style={tw`flex w-full h-[10rem] bg-neutral-100`}
          resizeMode="cover"
          source={{
            uri: `${ dish.item.image }`
          }}
        />
      </View>
      <View style={tw`flex-row items-center justify-between w-full py-1`}>
        <Text style={[tw`px-2 py-0.5 rounded-full text-xs text-white bg-[#f2b900]`, fonts.fontPoppinsLight]}>{ dish.item.category }</Text>
        <View style={tw`flex-row items-center`}>
          <View style={tw`flex-row items-center`}>
            <MaterialIcon
              name="heart"
              size="small"
              color="#676767"
            />
            <Text style={[tw`text-sm mx-1`, fonts.fontPoppins]}>{ dish.item.likes && dish.item.likes.length }</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <FeatherIcon
              name="message-square"
              size="small"
              color="#676767"
            />
            <Text style={[tw`text-sm mx-1`, fonts.fontPoppins]}>{ dish.item.comments && dish.item.comments.length }</Text>
          </View>
        </View>
      </View>
      <View style={tw`py-1`}>
        <Text style={[tw`rounded-full text-sm`, fonts.fontPoppinsLight]}>{ dish.item.description }</Text>
      </View>
      <View style={tw`flex flex-row items-center justify-between w-full pt-3`}>
        <View style={tw`flex flex-row items-center`}>
          <Text style={[tw`rounded-full text-sm text-neutral-400`, fonts.fontPoppinsItalic]}>- { dish.item.author.name }</Text>
        </View>
        <View style={tw`flex flex-row items-center`}>
          <MaterialIcon
            name="location"
            size="small"
            color="#c3c3c3"
          />
          <Text style={[tw`ml-1 rounded-full text-sm text-neutral-600`, fonts.fontPoppinsSemiBold]}>{ dish.item.location }</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DishCard