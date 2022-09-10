import React from 'react'
import DishCard from '../../components/Cards/DishCard'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { ScrollView, View, Text, TextInput } from 'react-native'

import { dishes } from '../../mock/dishes'

const FeedLayout = () => {
  return (
    <React.Fragment>
      <ScrollView style={tw`flex flex-col w-full px-3`}>
        <View style={tw`flex flex-col px-1 py-3`}>
          <Text style={[tw`text-2xl text-neutral-600`, fonts.fontPoppinsBold]}>Feed</Text>
          <Text style={[tw`text-sm text-neutral-400`, fonts.fontPoppinsLight]}>Browse dishes around the world.</Text>
        </View>
        <View style={tw`flex flex-col items-start justify-center w-full py-2`}>
          <TextInput
            style={[tw`flex w-full px-3 py-2 text-sm rounded-xl border border-neutral-200 bg-white`, fonts.fontPoppins]}
            placeholder="Search Dish"
          />
        </View>
        {dishes.map((dish: any, i: number) => (
          <DishCard
            key={i}
            dish={dish}
          />
        ))}
      </ScrollView>
    </React.Fragment>
  )
}

export default FeedLayout